import React from 'react';
import {Form, Button, Container, Alert, Row} from 'react-bootstrap';
import Header from "../../components/header";
import axios from "axios";
import {baseURL} from '../../middleware/axios';

import './allCardsList.scss';

export default class AllCardsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        name:'',
        cards:[],
        filteredCards:[]
    };
    this.handleName = this.handleName.bind(this);
    this.filter = this.filter.bind(this);

}
    
    componentDidMount(){
        this.findCards();

    }

    handleName(e){
        const name = e.target.value;
        this.setState({name:name})
    }
  

    registerRouter(){
        console.log("Indo pra rota de registro");
        
    }

     findCards = async () =>{
        const cardArray = await axios.get(baseURL+'/allCards')
        .then((response) => {
        return response;
        }).catch(() =>{
        console.log('Falha ao buscar cartas' )
    })
        this.setState({cards:cardArray.data.list});
    };

    filter = async (name) => {
       const newCardList = this.state.cards.filter((card) =>{
            if(card.name.includes(name)){
                return card
            }
        })
        console.log(newCardList);
        
        this.setState({filteredCards:newCardList});
    }

    
    render(){
        return (
            <React.Fragment>
            <Header/>
            <div className="flexBox">
                <div className='sideBar '>
                <Form className="">
                    <Form.Group controlId="formBasic">
                        <Form.Label>Name:</Form.Label>
                        <br></br>
                        <Form.Control type="text" value={this.state.name} onChange={this.handleName} className="FormControl"/>
                        <br></br>
                    </Form.Group>
                  
                    <Button variant="primary" type="submit" onSubmit={this.filter} onClick={this.filter}>
                        Search
                    </Button>
                    </Form>
                </div>
                <div className="mainDiv">
                    <div className="cardListDiv">
    
                    { this.state.cards.map((card) =><div className="cardDiv"><img src={card.card_images[0].image_url} key={card.id} className='card'></img></div>)}
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}
