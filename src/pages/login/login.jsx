import React from 'react';
import {Form, Button, Container, Alert} from 'react-bootstrap';
import axios from "axios";
import { Route, Redirect } from 'react-router'
import {baseURL} from '../../middleware/axios';

import './login.scss';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        username:'',
        password:'',
        isLogged: false,
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.submition = this.submition.bind(this);
}
    
    componentDidMount(){

    }
    handleUsername(e){
        const name = e.target.value;
        this.setState({username:name})
        
    }
  
    handlePassword(e){
        const pass = e.target.value;
        this.setState({password:pass})
    }

    async submition(){
        const {username, password} = this.state;  
        
        const login = await axios.post(baseURL+'/login', {username: username, password:password});
        if(login.data.success){
            localStorage.setItem('token', login.data._token);
            localStorage.setItem('username', username);

            this.setState({isLogged:true});
        }
    }
    render(){
        return (
            <React.Fragment>
            <Container>
            <div className="formDiv">
                <Form className="form">
                    <Form.Group controlId="formBasic">
                        <Form.Label>Username:</Form.Label>
                        <br></br>
                        <Form.Control type="text" value={this.state.username} onChange={this.handleUsername} className="FormControl"/>
                        <br></br>
                    </Form.Group>
                  
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <br></br>
                        <Form.Control type="password" value={this.state.password} onChange={this.handlePassword} />
                        <br></br>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={this.submition}>
                        LogIn
                    </Button>
                    <br></br>
                    <Button variant="primary" type="button" href='/register'>
                        Register
                    </Button>
                    </Form>
            </div>
            </Container>
            {this.state.isLogged && <Redirect to='/allCardList'></Redirect>}
            </React.Fragment>
        )
    }
}
