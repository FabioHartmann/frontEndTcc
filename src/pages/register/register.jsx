import React from 'react';
import {Form, Button, Container, Alert} from 'react-bootstrap';
import Header from "../../components/header";
import axios from "axios";
import {baseURL} from '../../middleware/axios';

import './register.scss';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleconfirmPassword = this.handleconfirmPassword.bind(this);
    this.submition = this.submition.bind(this);
}
    
    componentDidMount(){

    }
    handleUsername(e){
        const name = e.target.value;
        this.setState({username:name})
        
    }
    handleEmail(e){
        const userEmail = e.target.value;
        this.setState({email:userEmail})
        
    }
    handlePassword(e){
        const pass = e.target.value;
        this.setState({password:pass})
    }
    handleconfirmPassword(e){
        const confirmPass = e.target.value;
            this.setState({confirmPassword:confirmPass})
    }

    submition(){
        const {username, email, password, confirmPassword} = this.state;
        if(username.length < 3 || email.length < 3 || password.length < 3 || confirmPassword.length < 3 ){
            return(
                //Não funcionando
                <Alert variant='danger'>
                   Os campos devem ser preenchidos com 3 caracteres ou mais
                </Alert>
                )
        }else{
            if(password === confirmPassword){
               axios.post(baseURL+'/user', {username: username, email: email, password:password})
                .then(() => {
                //adicionar rota pra login
                console.log('Cadastrado com sucesso')
                }).catch(() =>{
                console.log('Falha ao cadastrar' )
            })
         }else{
             console.log('Caiu no else');          
         }
        }
    }

    logInRoute(){
        console.log('Mandar pra tela de login');
    }

    render(){
        return (
            <React.Fragment>
            <Header/>
            <Container>
            <div className="formDiv">
                <Form className="form">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username:</Form.Label>
                        <br></br>
                        <Form.Control type="text" value={this.state.username} onChange={this.handleUsername} className="FormControl"/>
                        <br></br>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address:</Form.Label>
                        <br></br>
                        <Form.Control type="email" value={this.state.email}  onChange={this.handleEmail} />
                        <br></br>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <br></br>
                        <Form.Control type="password" value={this.state.password} onChange={this.handlePassword} />
                        <br></br>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password:</Form.Label>
                        <br></br>
                        <Form.Control type="password" value={this.state.confirmPassword} onChange={this.handleconfirmPassword}  />
                        <br></br>
                    </Form.Group>
                    <Button variant="primary" type="submit" onSubmit={() => this.submition} onClick={this.submition}>
                        Register
                    </Button>
                    <Button variant="primary" type="button" onSubmit={() => this.logInRoute} onClick={this.logInRoute}>
                        Login
                    </Button>
                    </Form>
            </div>
            </Container>
            </React.Fragment>
        )
    }

}