import React from 'react';
import {Form, Button, Container, Alert} from 'react-bootstrap';
import Header from "../../components/header";
import axios from "axios";
import {baseURL} from '../../middleware/axios';

import './login.scss';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        username:'',
        password:'',
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

    submition(){
        const {username, password} = this.state;  
               axios.post(baseURL+'/login', {username: username, password:password})
                .then(() => {
                //adicionar rota pra login
                console.log('Logado com sucesso')
                }).catch(() =>{
                console.log('Falha ao Logar' )
            })

    }

    registerRouter(){
        console.log("Indo pra rota de registro");
        
    }

    render(){
        return (
            <React.Fragment>
            <Header/>
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
                    <Button variant="primary" type="submit" onSubmit={() => this.submition} onClick={this.submition}>
                        LogIn
                    </Button>
                    <br></br>
                    <Button variant="primary" type="button" onSubmit={() => this.registerRouter} onClick={this.registerRouter}>
                        Register
                    </Button>
                    </Form>
            </div>
            </Container>
            </React.Fragment>
        )
    }
}
