import React from 'react';
import {Form, Button, Container, Alert, Row} from 'react-bootstrap';
import axios from "axios";
import {baseURL} from '../../middleware/axios';

import './allDeckList.scss';

export default class AllDeckList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        newDeckName:'',
        filterName:'',
        pageNumber: 1,
        size:32,
        decks:[],
        totalDecks:null,
    };
    this.handleNewDeckName = this.handleNewDeckName.bind(this);
    this.handleFilterName = this.handleFilterName.bind(this);
    this.findDecks = this.findDecks.bind(this);

}
    componentDidMount(){
        this.findDecks(this.state.pageNumber);
    }

    handleNewDeckName(e){
        const name = e.target.value;
        this.setState({newDeckName:name})
    }

    handleFilterName(e){
        const name = e.target.value;
        this.setState({filterName:name})
    }

    createDeck = () =>{
        const createDeck = axios.post(baseURL+'/createDeck', {username: localStorage.getItem('username'), deck_name:this.state.newDeckName});
        this.findDecks();
    }

    findDecks = async (pageNumber) => {
        let searchString ='';
        if(this.state.filterName){
            searchString=`${searchString}&name=${this.state.filterName}`;
        }
        const deckArray = await axios.get(baseURL+`/allDecks/?pageNumber=${pageNumber}&size=18${searchString}&username=${localStorage.getItem('username')}&type=2`);        
        this.setState({
            decks:deckArray.data.decks,
            totalDecks:deckArray.data.listSize
        })
        
    }
    previousPage = () =>{
        if(this.state.pageNumber>1){
            this.findDecks(this.state.pageNumber-1);
        }//tratar erro
    }

    nextPage = () =>{ 
        let maxPageNumber = Math.ceil(this.state.totalDecks/18);    
        if(this.state.pageNumber < maxPageNumber){
            this.findDecks(this.state.pageNumber+1);
        }// tratar erro
    }
    
    render(){
        return (
            <React.Fragment>
            <div className="flexBox">
                <div className='sideBar'>
                <Form className="">
                    <span>Create Deck:</span>
                    <Form.Group controlId="formBasic">
                        <Form.Label>Name:</Form.Label>
                        <br></br>
                        <Form.Control type="text" required value={this.state.newDeckName} onChange={this.handleNewDeckName} className="FormControl"/>
                        <br></br>
                    </Form.Group>
                    <br></br>
                     <Button variant="primary" type="button" className='filterButton' onClick={() => this.createDeck()}>
                        Create
                    </Button> 
                    </Form>
                    
                    <Form className="">
                        <br></br>
                    <span>Search Deck:</span>
                    <Form.Group controlId="formBasic">
                        <Form.Label>Name:</Form.Label>
                        <br></br>
                        <Form.Control type="text" required value={this.state.filterName} onChange={this.handleFilterName} className="FormControl"/>
                        <br></br>
                    </Form.Group>
                    <br></br>
                     <Button variant="primary" type="button" className='filterButton' onClick={() => this.findCards(1)}>
                        Filter
                    </Button> 
                    </Form>
                </div>
                <div className="mainDiv">
                    <div className="cardListDiv">
                    {this.state.decks.map((deck) =><a className='link' href={`/deck/${deck.deck_name}`}><div className="deckDiv" key={deck.id}><span className='deckLink'>{`Deck:${deck.deck_name}`}</span></div></a>)}
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
