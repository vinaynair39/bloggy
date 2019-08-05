import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';

const Header = (props) => (
    <div>
        <h1>Bloggy</h1>
        <button onClick={props.logout}>Logout</button>
        <NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
        <NavLink to="/add" activeClassName="is-active">Add Expense</NavLink>
    </div>
)
const mapDispatchToProps = (dispatch) => {
    return {
      logout: ()=> dispatch(startLogout())
    };
  }
  
export default connect(undefined, mapDispatchToProps)(Header);