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
            deck:'',
            decks:null,
    };
    this.getCard = this.getCard.bind(this);
}
    
    componentDidMount(){
        this.getCard();
    }

    async getCard(){
        const foundCard = await axios.get(baseURL+`/singleCard/${this.props.match.params.id}`);        
        this.setState({
            card:foundCard.data.list,
            cardOwn:foundCard.data.userOwnThisCard,
        });
    }
    
    handleNumber = (e) =>{
        const number = parseInt(e.target.value);
        this.setState({cardNumber:number});
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
        if(card.banlist_info){
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
    }
    insertCardIntoDeck = async () =>{
        console.log('lalala');
        
    }
    checkHasCardOwner = () =>{
        const {cardOwn} = this.state;
        console.log(cardOwn);
        // const user = await axios.get(baseURL+'/inserIntoColection', {username: username, card:card, card_amount:cardNumber});

        if(cardOwn){
            return(
                <>
                <label>Choose Deck:</label>
                <select type="text" required value={this.state.deck} onChange={this.handleDeck} >
                {"MAp de options"}    
                </select>
                <button type="button" className="collectionButton" onClick={this.insertCardIntoDeck}>Add to Deck</button>
                </>
            )
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
            </>
        )
    }
}
