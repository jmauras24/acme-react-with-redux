import React, { Component } from 'react';
import store from '../store';
import { Route, HashRouter as Router } from 'react-router-dom';
import Users from './Users';
import User from './User';
import Nav from './Nav';

export default class App extends Component {
  constructor(){
    super();
    this.state = store.getState();
  }

  render(){
    return(
      <div>
        <Router>
          <div>
            <Route render={({ location }) => <Nav path={ location.pathname } />}/>
            <Route path='/user/:id' exact render = { ({ match }) => <User id={match.params.id}/>}/>
            <Route path='/users' exact render = { () => <Users/>}/>
          </div>
        </Router>
      </div>
    )
  }
}
