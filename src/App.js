import React from 'react';
import Header from './components/header';
import './App.css';
import Register from './pages/register/register';
import Login from './pages/login/login';
import AllCardsList from './pages/allCardsList/allCardsList';
import Card from './pages/card/card';
import MyCards from './pages/myCards/myCards';


import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App() {
  return (
    <Router>
    <div>
      <Header />
      {/* <Route exact path="/" component={AllCardsList} /> */}
      <Route  path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/allCardList" component={AllCardsList} />
      <Route path="/card/:id" component={Card} />
      <Route path="/myCards/" component={MyCards} />


    </div>
  </Router>
);
}

export default App;
