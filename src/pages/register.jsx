import React from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import Header from "./../components/header";
import axios from "axios";

import './register.scss';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        username:'',
        // email:'',
        // password:'',
        // confirmPassword:'',
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleconfirmPassword = this.handleconfirmPassword.bind(this);


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
        const {username, email, password, confirmPassword} = this.state;

        console.log(username, email, password, confirmPassword);

    }

    submition(){
        const {username, email, password, confirmPassword} = this.state;

        if(password === confirmPassword){
            alert(username, email, password, confirmPassword)
            console.log(username, email, password, confirmPassword);
            
        //     axios.post('/user', {username: username, email: email, password:password})
        // .then((response) => {
        // console.log('Cadastrado com sucesso' + response)
        //  }).catch(() =>{
        //     console.log('Falha ao cadastrar' + response)
        // })
     }
    }

    render(){
        return (
            <React.Fragment>
            <Header/>
            <Container>
            <div className="formDiv col-4">
                <Form className="form">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={this.state.username} onChange={this.handleUsername} className=""/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control type="email" value={this.state.email}  onChange={this.handleEmail} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={this.state.password} onChange={this.handlePassword} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control type="password" value={this.state.confirmPassword} onChange={this.handleconfirmPassword}  />
                    </Form.Group>
                    <Button variant="primary" type="submit" onSubmit={this.submition}>
                        Submit
                    </Button>
                    </Form>
            </div>
            </Container>
            </React.Fragment>

            
        )
    }

}