import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store, { getUsers, addUser } from "../store";
import axios from 'axios';

export default class Users extends Component {
  constructor(){
    super();
    this.state = store.getState();
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    axios.get('/api/users')
      .then( res => res.data )
      .then( users => {
        store.dispatch(getUsers(users))
      })

    this.unsubscribe = store.subscribe( () =>
      this.setState(store.getState())
    );
  }

  componentWillUnmount () {
    this.unsubscribe();
  };

  handleEvent(ev){
    store.dispatch(addUser(ev.target.value))
  }

  handleCreate(ev){
    ev.preventDefault()
    const user = this.state.user;
    axios.post('/api/users', { name: user })
      .then( res => res.data )
      .then( user => {
        // store.dispatch(getNewUsers(user))
        // store.dispatch(clear())
      })
  }

  handleDelete(ev, user){
    ev.preventDefault()
    axios.delete(`/api/users/${user.id}`)
      .then( res => res.data )
      .then( () => {
        const users = this.state.users.filter(_user => _user.id === user.id*1 ? false : true)
        store.dispatch(getUsers(users))
      })
  }

  render(){
    const { users } = this.state;
    return(
      <div className='container-fluid'>
        <h1>Users</h1>
        <form onSubmit={this.handleCreate}>
          <div className='form-control form-control-lg'>
          <input value={this.state.user} onChange={this.handleEvent} placeholder='User Name' />
          <button className='btn btn-primary'> Create </button>
          </div>
        </form>
        <ul className="list-group">
          {
            users.map(user => {
              return (
                <li key={user.id}>
                  <Link to={`/users/${user.id}`} >{user.name}</Link>
                  <button className='btn btn-danger' onClick={(ev) => this.handleDelete(ev, user) }> Delete </button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
