import { createStrore, createStore } from 'redux';

const GET_USERS = 'GET_USERS';

const initialize ={
  users:[],
  user: ''
}

const reducer = (state = initialize, action) => {
  switch(action.type){
    case 'GET_USERS':
      return Object.assign({}, state, { users: action.users })
    case 'ADD_USER':
      return Object.assign({},state,{ user: action.user } )
    default:
      return state;
  }
}

//named exports for actions
export const getUsers = (users) => {
  return {
    type: 'GET_USERS',
    users: users
  }
}

export const addUser = (user) => {
  return {
    type: 'ADD_USER',
    user: user
  }
}
const store = createStore(reducer);
export default store;
