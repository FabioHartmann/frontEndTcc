import React from 'react';
import {Form, Button, Container, Alert} from 'react-bootstrap';
import axios from "axios";
import { Route, Redirect } from 'react-router'
import {baseURL} from '../../middleware/axios';

import './card.scss';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card:null,
            cardNumber:null,
            cardOwn:null,
            cardAmount:null,
            deck:'',
            decks:null,
            deckCardNumber:null,
             

    };
    this.getCard = this.getCard.bind(this);
    this.getDecks = this.getDecks.bind(this);

}
    
    componentDidMount(){
        this.getCard();
        this.getDecks();
    }

    async getCard(){
        const foundCard = await axios.get(baseURL+`/singleCard/${this.props.match.params.id}/?username=${localStorage.getItem('username')}`);  
        console.log(foundCard);
                           
        this.setState({
            card:foundCard.data.list,
            cardOwn:foundCard.data.userOwnThisCard,
            cardAmount:foundCard.data.card_amount
        });
    }

    
    handleNumber = (e) =>{
        const number = parseInt(e.target.value);
        this.setState({cardNumber:number});
    }
    handleDeckNumber = (e) => {
        const number = parseInt(e.target.value);
        this.setState({deckCardNumber:number});
    }

    handleDeck = (e) =>{
        const deck = e.target.value;
        this.setState({deck:deck});
    }

    showImage = () =>{
        if(this.state.card){
            return( <div className='imageDiv'> <img className="image" src={this.state.card.card_images[0].image_url} alt=""/> </div>)
        }
    }

    checkBanList = () =>{
        const {card} = this.state;      
          console.log('banlist information',!!card.banlist_info);
        if(!!card.banlist_info && !!card.banlist_info.ban_tcg){
            return (
            <input className="informationInput" readOnly value={`Banlist TCG: ${card.banlist_info.ban_tcg}`}/>
            )
        }
    }

     insertCardInCollection = async () =>{
        const  {card, cardNumber} = this.state;
        const username = localStorage.getItem('username');
        if(cardNumber){
            const insertCard = await axios.post(baseURL+'/inserIntoColection', {username: username, card:card, card_amount:cardNumber});
        }//tratar erro
        this.getCard()

    }
    insertCardIntoDeck = async () =>{
        const {deck, deckCardNumber, card} = this.state;
        const username = localStorage.getItem('username');        

        const postCard = {
                card_id: card.id,
                card_amount: deckCardNumber,
                type: card.type
        }

        if(deck && deckCardNumber){
            const insertCard = await axios.post(baseURL+'/insertCardIntoDeck', {username: username, card:postCard, deck_name:deck});
        } 
        this.checkHasCardOwner();      
    }

    getDecks = async () =>{     
            const decks =  await axios.get(baseURL + `/allDecks/?username=${localStorage.getItem('username')}`);
            this.setState({decks:decks.data.decks});
    }

     checkHasCardOwner = () =>{
        const {cardOwn, decks} = this.state;
     
        if(cardOwn && decks){
            return(
                <>
                <label>Choose Deck:</label>
                <select type="text" required value={this.state.deck} onChange={this.handleDeck} >
                    <option></option>
                {this.state.decks.map((deck) => <option>{deck.deck_name}</option>)}    
                </select>
                <input type="number" placeholder="Card amount" required value={this.state.deckCardNumber} onChange={this.handleDeckNumber} />
                <button type="button" className="collectionButton" onClick={this.insertCardIntoDeck}>Add to Deck</button>
                </>
            )
        }        
        }
    renderCardAmountInCollection = () =>{
        const {cardAmount} = this.state;
        if(cardAmount > 0){
        return(
        <div className='cardOwn'>
        <span>Card amount in:</span>
        <br/>
        <input className='firstLine informationInput' readOnly value={`Collection: ${cardAmount}`}/>
        </div>)
        }

    }

    cardInformation = () =>{
        const {card} =this.state;
        if(card){
            if(!card.archetype){
                card.archetype='';
            }
            console.log(card.type);
            
            if(card.type ==="Spell Card"){
                return (
                    <div className="cardInformation">
                        <input className='firstLine informationInput'readOnly value={`Name: ${card.name}`}/>
                        <input className='firstLine informationInput'readOnly value={`ID:${card.id}`}/>
                        <input className="informationInput" readOnly value={`Race: ${card.race}`}/>
                        <input className="informationInput" readOnly value={`Type: ${card.type}`}/>
                        <input className="informationInput" readOnly value={`Archetype:${card.archetype}`}/>
                        {this.checkBanList()}
                        <textarea readOnly value={`Description:${card.desc}`}/>
                    </div>
                                     )
            }else if(card.type ==="Trap Card"){
                return (
                    <div className="cardInformation">
                        <input className='firstLine informationInput' readOnly value={`Name: ${card.name}`}/>
                        <input className='firstLine informationInput'readOnly value={`ID:${card.id}`}/>
                        <input className="informationInput" readOnly value={`Race: ${card.race}`}/>
                        <input className="informationInput" readOnly value={`Type: ${card.type}`}/>
                        <input className="informationInput" readOnly value={`Archetype:${card.archetype}`}/>
                        {this.checkBanList()}
                        <textarea readOnly value={`Description:${card.desc}`}/>

                    </div>
                )
            }else if(card.type ==="Skill Card"){
                return (
                    <div className="cardInformation">
                        <input className='firstLine informationInput'readOnly value={`Name: ${card.name}`}/>
                        <input className='firstLine informationInput' readOnly value={`ID:${card.id}`}/>
                        <input className="informationInput" readOnly value={`Race: ${card.race}`}/>
                        <input className="informationInput" readOnly value={`Type: ${card.type}`}/>
                        {this.checkBanList()}
                        <textarea readOnly value={`Description:${card.desc}`}/>

                    </div> 
                    )  
            }else if(card.type ==="Link Monster"){
                return (
                    <div className="cardInformation">
                        <input className='firstLine informationInput' readOnly value={`Name: ${card.name}`}/>
                        <input className='firstLine informationInput' readOnly value={`Link: ${card.linkval}`}/>
                        <input className="informationInput" readOnly value={`ID:${card.id}`}/>
                        <input className="informationInput"readOnly value={`Race: ${card.race}`}/>
                        <input className="informationInput" readOnly value={`Type: ${card.type}`}/>
                        <input className="informationInput" readOnly value={`Archetype:${card.archetype}`}/>
                        <input className="informationInput" readOnly value={`Attribute:${card.attribute}`}/>
                        <input className="informationInput" readOnly value={`Link Markers: ${card.linkmarkers}`}/>
                        <input className="informationInput" readOnly value={`ATK: ${card.atk}`}/>
                        {this.checkBanList()}
                        <textarea readOnly value={`Description:${card.desc}`}/>

                    </div > 
                    )  
            }else if(card.type ==="Pendulum Effect Monster" ||
                    card.type ==="Pendulum Flip Effect Monster" ||
                    card.type ==="Pendulum Normal Monster"||
                    card.type ==="Pendulum Tuner Effect Monster"||
                    card.type ==="Pendulum Effect Fusion Monster"||
                    card.type ==="Synchro Pendulum Effect Monster"||
                    card.type ==="XYZ Pendulum Effect Monster")
                                    {
                return (
                        <div className="cardInformation">
                            <input className='firstLine informationInput' readOnly value={`Name: ${card.name}`}/>
                            <input className='firstLine informationInput' readOnly value={`Level: ${card.level}`}/>
                            <input className="informationInput" readOnly value={`ID:${card.id}`}/>
                            <input className="informationInput" readOnly value={`Race: ${card.race}`}/>
                            <input className="informationInput" readOnly value={`Type: ${card.type}`}/>
                            <input className="informationInput" readOnly value={`Archetype:${card.archetype}`}/>
                            <input className="informationInput" readOnly value={`Attribute:${card.attribute}`}/>
                            <input className="informationInput" readOnly value={`Scale: ${card.scale}`}/>
                            <input className="informationInput"readOnly value={`ATK: ${card.atk}`}/>
                            <input className="informationInput" readOnly value={`DEF: ${card.def}`}/>
                            {this.checkBanList()}
                        <textarea readOnly value={`Description:${card.desc}`}/>
                        </div>
                    )  
                           
            }
            else{
                return (
                    <div className="cardInformation">
                        <input className='firstLine informationInput'readOnly value={`Name: ${card.name}`}/>
                        <input className='firstLine informationInput' readOnly value={`Level: ${card.level}`}/>
                        <input className="informationInput" readOnly value={`ID:${card.id}`}/>
                        <input className="informationInput" readOnly value={`Race: ${card.race}`}/>
                        <input className="informationInput" readOnly value={`Type: ${card.type}`}/>
                        <input className="informationInput" readOnly value={`Archetype:${card.archetype}`}/>
                        <input className="informationInput" readOnly value={`Attribute:${card.attribute}`}/>
                        <input className="informationInput" readOnly value={`ATK: ${card.atk}`}/>
                        {this.checkBanList()}
                        <textarea readOnly value={`Description:${card.desc}`}/>
                    </div>
                )
            }
        }
    }
        render(){    
            console.log(this.state.decks);
               
        return (
            <>
            <div className='wrapper'>
                {this.showImage()}
                {this.cardInformation()}
            <div className="cardForm">
            <label>Card Amount:</label>
            <input type="number" required value={this.state.cardNumber} onChange={this.handleNumber} />
            <button type="button" className="collectionButton" onClick={this.insertCardInCollection}>Add to Collection</button>
            {this.checkHasCardOwner()}
            </div>
            </div>
            {this.renderCardAmountInCollection()}
            </>
        )
    }
}
