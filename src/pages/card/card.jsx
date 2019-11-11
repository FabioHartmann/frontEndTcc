import React from 'react';
import {Form, Button, Container, Alert} from 'react-bootstrap';
import axios from "axios";
import { Route, Redirect } from 'react-router'
import {baseURL} from '../../middleware/axios';
import Header from './../../components/header';
import {ToastsContainer, ToastsStore} from 'react-toasts';



import './card.scss';
import { isFlowBaseAnnotation } from '@babel/types';

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
        console.log(foundCard.data.list);
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
        if(!!card.banlist_info && !!card.banlist_info.ban_tcg){
            return (
            <input className="informationInput" readOnly value={`Banlist TCG: ${card.banlist_info.ban_tcg}`}/>
            )
        }
    }

    checkArchetype = () =>{
        const {card} = this.state;      
        if(!!card.archetype){
            return (
                <input className="informationInput" readOnly value={`Archetype:${card.archetype}`}/>
                )
        }
    }

     insertCardInCollection = async () =>{
        const  {card, cardNumber} = this.state;
        const username = localStorage.getItem('username');
        console.log('Bearer ' + localStorage.getItem('token'));
        
        if(cardNumber){
            const insertCard = await axios.post(baseURL+'/inserIntoColection',
            {username: username, card:card, card_amount:cardNumber, token:'Bearer ' + localStorage.getItem('token')});
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
            const insertCard = await axios.post(baseURL+'/insertCardIntoDeck', {username: username, card:postCard, deck_name:deck, token:'Bearer ' + localStorage.getItem('token')});
        } 
        this.checkHasCardOwner(); 
        this.renderCardAmountInCollection();

             
    }

    getDecks = async () =>{     
            const decks =  await axios.get(baseURL + `/allDecks/?username=${localStorage.getItem('username')}`,
            {headers: {Authorization:'Bearer ' + localStorage.getItem('token')}});
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
                <input type="number" required placeholder="Card amount" required value={this.state.deckCardNumber} onChange={this.handleDeckNumber} />
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
        <input className=' informationInput' readOnly value={`Collection: ${cardAmount}`}/>
        </div>)
        }
    }

    renderPrices = () =>{
        const {card} =this.state;
        
        if(card && card.card_sets.length > 0){
                return <div className='priceDiv'>
                {card.card_sets.map((set) => <div className="priceLine">
                <input className=' 'readOnly value={`Set Name: ${set.set_name}`}/>
                <input className=' ' readOnly value={`Set Code: ${set.set_code}`}/>
                <input className=' ' readOnly value={`Set Rarity: ${set.set_rarity}`}/>
                <input className=' ' readOnly value={`Set Price: ${set.set_price}$`}/>
                </div> )}
                </div>
           
        }
    }

    cardInformation = () =>{
        const {card} =this.state;
        if(card){
            if(!card.archetype){
                card.archetype='';
            }
            
            if(card.type ==="Spell Card"){
                return (
                    <div className="cardInformation">
                        <input className='firstLine informationInput'readOnly value={`Name: ${card.name}`}/>
                        <input className='firstLine informationInput'readOnly value={`ID:${card.id}`}/>
                        <input className="informationInput" readOnly value={`Race: ${card.race}`}/>
                        <input className="informationInput" readOnly value={`Type: ${card.type}`}/>
                        {this.checkArchetype()}
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
                        {this.checkArchetype()}
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
                        {this.checkArchetype()}
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
                            {this.checkArchetype()}
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
                        {this.checkArchetype()}
                        <input className="informationInput" readOnly value={`Attribute:${card.attribute}`}/>
                        <input className="informationInput" readOnly value={`ATK: ${card.atk}`}/>
                        <input className="informationInput" readOnly value={`DEF: ${card.def}`}/>
                        {this.checkBanList()}
                        <textarea readOnly value={`Description:${card.desc}`}/>
                    </div>
                )
            }
        }
    }
        render(){                  
        return (
            <>
            <Header isLogged={localStorage.getItem('token')}/>
            <div className="wrapper">
            <div className='mainWwrapper'>
                <div>
                {this.showImage()}
                {this.renderCardAmountInCollection()}
                </div>
                {this.cardInformation()}
            <div className="cardForm">
            <label>Card Amount:</label>
            <input type="number" required value={this.state.cardNumber} onChange={this.handleNumber} />
            <button type="button" className="collectionButton" onClick={this.insertCardInCollection}>Add to Collection</button>
            {this.checkHasCardOwner()}
            </div>
            {this.renderPrices()}
            </div>
            </div>
            </>
        )
    }
}
