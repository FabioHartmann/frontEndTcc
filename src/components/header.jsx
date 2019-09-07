import React from 'react';
import logo from './logo.svg';
import {Navbar, Nav} from 'react-bootstrap';

import './header.scss';

export default class Header extends React.Component {
    state = {
        isLogged: null,
    }
    checkUser(){
       if(!localStorage.getItem("token")){
           this.setState({isLogged : true});
       }else{
           this.setState({isLogged : false});
       }
   }
    componentDidMount(){
        this.checkUser();
    }
     chooseHeader (logged){
        if(logged){
            return(
            <React.Fragment>
           
            <Nav className="links">
                <Nav.Link className="navLink brand" href="#home">  <img
            alt=""
            src= {logo}
            width="270"
            height=""
              /></Nav.Link>
                <Nav.Link className="navLink" href="#home">Search Cards</Nav.Link>
                <Nav.Link className="navLink" href="#link">My Cards</Nav.Link>
                <Nav.Link className="navLink" href="#link">Manage Decks</Nav.Link>
            </Nav>
            </React.Fragment>)
        }else{
            return(
            <React.Fragment>
            <Navbar.Brand className="brand" href=""><img
            alt=""
            src={logo}
            width="270"
            height=""
              /></Navbar.Brand>
            </React.Fragment>)
        }
    }
    
    render(){
        let logged = this.state.isLogged;
        return (
            <Navbar className="col-12 header" bg="light" expand="lg">
            {this.chooseHeader(logged)}
            </Navbar>
        )
    }

}