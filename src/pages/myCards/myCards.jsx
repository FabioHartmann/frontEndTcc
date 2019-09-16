import React from 'react';
import {Form, Button, Container, Alert, Row} from 'react-bootstrap';
import axios from "axios";
import {baseURL} from '../../middleware/axios';

export default class MyCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        name:'',
        archetype:'',
        type:'',
        level:'', 
        attribute:'',
        race:'',
        pageNumber: 1,
        size:32,
        cards:[],
        totalCards:null,
    };
    this.handleName = this.handleName.bind(this);
    this.handleAttribute = this.handleAttribute.bind(this);
    this.handleRace = this.handleRace.bind(this);
    this.handleArchetype = this.handleArchetype.bind(this);
    this.handleLevel = this.handleLevel.bind(this);
    this.handleType = this.handleType.bind(this);

    this.findCards = this.findCards.bind(this);

}
    componentDidMount(){
        this.findCards(this.state.pageNumber);
    }

    handleName(e){
        const name = e.target.value;
        this.setState({name:name})
    }

    handleAttribute(e){
        const attribute = e.target.value;
        this.setState({attribute:attribute})
    }

    handleRace(e){
        const race = e.target.value;
        this.setState({race:race})
    }

    handleArchetype(e){
        const archetype = e.target.value;
        this.setState({archetype:archetype})
    }

    handleLevel(e){
        const level = e.target.value;
        this.setState({level:level})
    }

    handleType(e){
        const type = e.target.value;
        this.setState({type:type})
    }

    findCards = async (pageNumber) => {
        console.log('numero da page depois de clicar', this.state.pageNumber);
        let searchString ='';
        if(this.state.name){
            searchString=`${searchString}&name=${this.state.name}`;
        }
        if(this.state.archetype){
            searchString=`${searchString}&archetype=${this.state.archetype}`;

        }
        if(this.state.type){
            searchString=`${searchString}&type=${this.state.type}`;

        }
        if(this.state.level){
            searchString=`${searchString}&level=${this.state.level}`;

        } 
        if(this.state.attribute){
            searchString=`${searchString}&attribute=${this.state.attribute}`;

        }
        if(this.state.race){
            searchString=`${searchString}&race=${this.state.race}`;
        }

        const cardArray = await axios.get(baseURL+`/userCardsList/${localStorage.getItem('username')}?pageNumber=${pageNumber}&size=18${searchString}`);        
        this.setState({
            cards:cardArray.data.list,
            pageNumber: pageNumber,   
            totalCards:cardArray.data.cardNumber,     
        });
    }
    previousPage = () =>{
        if(this.state.pageNumber>1){
            this.findCards(this.state.pageNumber-1);
        }//tratar erro
    }

    nextPage = () =>{ 
        let maxPageNumber = Math.ceil(this.state.totalCards/32);    
        if(this.state.pageNumber < maxPageNumber){
            this.findCards(this.state.pageNumber+1);
        }// tratar erro
    }

    
    render(){
        return (
            <React.Fragment>
            <div className="flexBox">
                <div className='sideBar '>
                <Form className="">
                    <Form.Group controlId="formBasic">
                        <Form.Label>Name:</Form.Label>
                        <br></br>
                        <Form.Control type="text" value={this.state.name} onChange={this.handleName} className="FormControl"/>
                        <br></br>
                        <Form.Label>Race:</Form.Label>
                        <br></br>
                        <Form.Control as="select" value={this.state.race} onChange={this.handleRace}  className="FormControl">
                            <option></option>
                            <option>Aqua</option>
                            <option>Beast</option>
                            <option>Beast-Warrior</option>
                            <option>Creator-God</option>
                            <option>Cyberse</option>
                            <option>Dinosaur</option>
                            <option>Divine-Beast</option>
                            <option>Dragon</option>
                            <option>Fairy</option>
                            <option>Fiend</option>
                            <option>Fish</option>
                            <option>Insect</option>
                            <option>Machine</option>
                            <option>Plant</option>
                            <option>Psychic</option>
                            <option>Pyro</option>
                            <option>Reptile</option>
                            <option>Rock</option>
                            <option>Sea Serpent</option>
                            <option>Spellcaster</option>
                            <option>Thunder</option>
                            <option>Warrior </option>
                            <option>Winged Beast</option>
                            <option>Wyrm </option>
                            <option>Normal</option>
                            <option>Field</option>
                            <option>Equip</option>
                            <option>Continuous</option>
                            <option>Quick-Play</option>
                            <option>Ritual</option>
                            <option>Trap Cards</option>
                            <option>Counter</option>
                        </Form.Control>
                        <br></br>
                        <Form.Label>Attribute:</Form.Label>
                        <br></br>
                        <Form.Control as="select" value={this.state.attribute} onChange={this.handleAttribute}  className="FormControl">
                            <option></option>
                            <option>WATER</option>
                            <option>WIND</option>
                            <option>LIGHT</option>
                            <option>DARK</option>
                            <option>FIRE</option>
                            <option>EARTH</option>
                            <option>DIVINE</option>                             
                        </Form.Control>

                        <br></br>
                        <Form.Label>Type:</Form.Label>
                        <br></br>
                        <Form.Control as="select" value={this.state.type} onChange={this.handleType}  className="FormControl">
                        <option></option>
                            <option>Effect Monster</option>
                            <option>Flip Effect Monster</option>
                            <option>Flip Tuner Effect Monster</option>
                            <option>Gemini Monster</option>
                            <option>Normal Monster</option>
                            <option>Normal Tuner Monster</option>
                            <option>Pendulum Effect Monster</option>
                            <option>Pendulum Flip Effect Monster</option>
                            <option>Pendulum Normal Monster</option>
                            <option>Pendulum Tuner Effect Monster</option>
                            <option>Ritual Effect Monster</option>
                            <option>Ritual Monster</option>
                            <option>Skill Card</option>
                            <option>Spell Card</option>
                            <option>Spirit Monster</option>
                            <option>Toon Monster</option>
                            <option>Trap Card</option>
                            <option>Tuner Monster</option>
                            <option>Union Effect Monster</option>
                            <option>Union Tuner Effect Monster</option>
                            <option>Fusion Monster</option>
                            <option>Link Monster</option>
                            <option>Pendulum Effect Fusion Monster</option>
                            <option>Synchro Monster</option>
                            <option>Synchro Pendulum Effect Monster</option>
                            <option>Synchro Tuner Monster</option>
                            <option>XYZ Monster</option>
                            <option>XYZ Pendulum Effect Monster</option>
                        </Form.Control>
                        <br></br>
                        <Form.Label>Archetype:</Form.Label>
                        <br></br>
                        <Form.Control type="text" value={this.state.archetype} onChange={this.handleArchetype} className="FormControl"/>
                        <br></br>
                        <Form.Label>Level:</Form.Label>
                        <br></br>
                        <Form.Control as="select" value={this.state.level}  onChange={this.handleLevel}  className="FormControl">
                            <option></option>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </Form.Control>
                    </Form.Group>
                    <br></br>
                     <Button variant="primary" type="button" className='filterButton' onClick={() => this.findCards(1)}>
                        Filter
                    </Button> 
                    </Form>
                </div>
                <div className="mainDiv">
                    <div className="cardListDiv">
                    {this.state.cards.map((element) =><div className="cardDiv" key={element.card.id}><a href={`/card/${element.card.id}`}><img src={element.card.card_images[0].image_url}  className='card'></img></a></div>)}
                    </div>
                    <div className='buttons'>
                    <button className='paginationButton' type="button" onClick={this.previousPage}>{ `<` }</button>
                    <b className='paginationText'>{`Page ${this.state.pageNumber}`}</b>
                    <button className='paginationButton' type="button" onClick={this.nextPage}>{ `>` }</button>
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}
