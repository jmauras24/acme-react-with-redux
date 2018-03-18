import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import store, { getUsers, addUser, updateUsers, resetStateFields } from "../store";
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
        store.dispatch(updateUsers(user));
        store.dispatch(resetStateFields(''));
      })
      // .then(() => {
      //   console.log('trying to redirect')
      //   // return <Redirect to='/users'/>   ??? works without this, react taking care of it
      // })
  }

  handleDelete(ev, id){
    ev.preventDefault()
    axios.delete(`/api/users/${id}`)
      .then( res => res.data )
      .then( () => {
        const users = this.state.users.filter(user => user.id === id*1 ? false : true)
        store.dispatch(getUsers(users))
      })
  }

  render(){
    const { users, user } = this.state;
    const { handleCreate, handleDelete, handleEvent } = this;
    return(
      <div>
        <h1>Users</h1>
        <form onSubmit={handleCreate}>
          <div>
          <input value={user} onChange={handleEvent} placeholder='User Name' />
          <button disabled={user.length === 0}> Create </button>
          </div>
        </form>
        <ul className='list-group list-group-flush'>
          {
            users.map(user => {
              return (
                <li className='list-group-item' key={user.id}>
                  <Link to={`/user/${user.id}`} ><span style={{fontSize: 30}}>{user.name}</span></Link>
                  <button style={{ margin: '20px'}} className='glyphicon glyphicon-remove btn-sm btn-danger' onClick={(ev) => handleDelete(ev, user.id) }></button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
