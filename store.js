import { createStrore, createStore } from 'redux';

const GET_USERS = 'GET_USERS';
const ADD_USER = 'ADD_USER';
const GET_USER = 'GET_USER';
const SET_OLD_USER = 'SET_OLD_USER';
const UPDATE_USERS = 'UPDATE_USERS';
const RESET_STATE_FIELDS = 'RESET_STATE_FIELDS';

const initialize ={
  users:[],
  user: '',
  oldUser: ''
}

const reducer = (state = initialize, action) => {
  switch(action.type){
    case 'GET_USERS':
      return Object.assign({}, state, { users: action.users })
    case 'ADD_USER':
      return Object.assign({},state,{ user: action.user } )
    case 'GET_USER':
      return Object.assign({},state,{ user: action.user } )
      case 'SET_OLD_USER':
      console.log('SET_OLD_USER', action);
      return Object.assign({},state,{ oldUser: action.oldUser } )
    case 'RESET_STATE_FIELDS':
      return Object.assign({},state,{ oldUser: action.value, user: action.value } )
    case 'UPDATE_USERS':
      return Object.assign({},state,{ users: [...state.users, action.user] } )
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

export const getUser = (user) => {
  return {
    type: 'GET_USER',
    user: user
  }
}

export const setOldUser = (user) => {
  return {
    type: 'SET_OLD_USER',
    oldUser: user
  }
}

export const updateUsers = (user) => {
  return {
    type: 'UPDATE_USERS',
    user: user
  }
}

export const resetStateFields = (value) => {
  return {
    type: 'RESET_STATE_FIELDS',
    value: value
  }
}
const store = createStore(reducer);
export default store;
