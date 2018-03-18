import React, { Component } from 'react';
import store, { getUser, addUser, setOldUser, resetStateFields } from '../store';
import axios from 'axios';

export default class User extends Component {

  constructor(){
    super();
    this.state = store.getState();
    this.handleEvent = this.handleEvent.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount(){
    axios.get(`/api/user/${this.props.id}`)
    .then( res => res.data )
    .then( user => {
      console.log(user.name)
      store.dispatch(setOldUser(user.name));
      store.dispatch(getUser(user.name));
    })
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()));
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  handleEvent(ev){
    store.dispatch(addUser(ev.target.value));
  }

  handleUpdate(ev){
    ev.preventDefault()
    axios.put(`/api/user/${this.props.id}`, {name: this.state.user })
    .then( res => res.data)
    .then(() => {
      store.dispatch(resetStateFields(''));
      document.location.hash = '/users';
    })
  }

  render(){
    const { handleUpdate, handleEvent } = this;
    const { user, oldUser } = this.state;
    return(
      <div>
      <h1>User: {oldUser}</h1>
      <form onSubmit={handleUpdate}>
      <div>
      <input value={user} onChange={handleEvent} placeholder={user} />
          <button> Update </button>
          </div>
        </form>
      </div>
    )
  }
}
