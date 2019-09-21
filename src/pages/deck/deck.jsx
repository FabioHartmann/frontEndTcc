import React from 'react';
import {Form, Button, Container, Alert, Row} from 'react-bootstrap';
import axios from "axios";
import {baseURL} from '../../middleware/axios';

import './deck.scss';

export default class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        mainDeck:[],
        extraDeck:[],
        totalCards:null,
    };
    this.getDeck = this.getDeck.bind(this);

}
    componentDidMount(){
        this.getDeck();
    }

    async getDeck(){        
        const foundDeck = await axios.get(baseURL+`/deck/?name=${this.props.match.params.name}&username=${localStorage.getItem('username')}`);  
        console.log(foundDeck.data.deck[0].deck_cards);
        
        this.setState({
            mainDeck:foundDeck.data.deck[0].deck_cards,
            extraDeck:foundDeck.data.deck[0].extra_deck_cards,
        });
    }

    renderMainDeck = () =>{
        this.state.mainDeck.map((card) => <div className="cardDiv" key={card.card.id}><a href={`/card/${card.card.id}`}><img src={card.card.card_images[0].image_url}  className='card'></img></a></div>)
        //fazer repetir a carta conforme a quantidade no deck
    }

    render(){
        return (
            <React.Fragment>
            <div className="flexBox">
                <div className='sideBar '>
                </div>
                <div className="deckMainDiv">
                    <div className="cardListDiv">
                    {this.state.mainDeck.map((card) =><div className="cardDiv" key={card.card.id}><a href={`/card/${card.card.id}`}><img src={card.card.card_images[0].image_url}  className='card'></img></a></div>)}
                    </div>
                    <div className="cardListDiv">
                    {this.state.extraDeck.map((card) =><div className="cardDiv" key={card.card.id}><a href={`/card/${card.card.id}`}><img src={card.card.card_images[0].image_url}  className='card'></img></a></div>)}
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}