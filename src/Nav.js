import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ path }) => {
  return(
    <ul>
      <li>
      {
        path === '/users' ?
        (  <span>Users</span> )
        :
        ( <Link to='/users'>Users</Link> )
      }
      </li>
     {/* <li>
      {
        path === '/create' ?
        ( <span>Create User</span> )
        :
        ( <Link to='/create'>Create User</Link> )
      }
    </li> */}
      <li>
      {
        path === '/products' ?
        ( <span>Products</span> )
        :
        ( <Link to='/products'>Products</Link> )
      }
      </li>
    </ul>
  )
}

export default Nav;
