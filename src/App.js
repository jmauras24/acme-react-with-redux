import React, { Component } from 'react';
import store from '../store';
import { Route, HashRouter as Router } from 'react-router-dom';
import Users from './Users';

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
            <Route path='/' exact render = { () => <Users/>}/>
          </div>
        </Router>
      </div>
    )
  }
}
