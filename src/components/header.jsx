import React from 'react';
import logo from './logo.svg';
import { Route, Redirect } from 'react-router'
import {Navbar, Nav} from 'react-bootstrap';

import './header.scss';

export default class Header extends React.Component {
    state = {
        isLogged: !!this.props.isLogged,
    }    

    logout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.setState({isLogged:false})
    }        
     chooseHeader (logged){
        if(logged){
            return(
            <React.Fragment>
            <Nav className="links">
                <Nav.Link className="navLink brand" href="#home"><img
            alt=""
            src= {logo}
            width="270"
            height=""
              /></Nav.Link>
                <Nav.Link className="navLink" href="/allCardList">Search Cards</Nav.Link>
                <Nav.Link className="navLink" href="/myCards">My Cards</Nav.Link>
                <Nav.Link className="navLink" href="/manageDecks">Manage Decks</Nav.Link>
            </Nav>
            <Nav.Link className="navLink logout" href="/login" onClick={this.logout}> LogOut</Nav.Link>

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