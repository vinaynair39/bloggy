import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';
import {Link} from 'react-router-dom'

const Header = (props) =>{

    const [toggle, setToggle] = useState(false);
    const onClick = ()=> {
        setToggle(!toggle)
     }

    const getNotifications = () => {
        return props.notifications.map(notification => {
            const path = notification.blogId ? '/blog/' + notification.blogId : '/dashboard'
            return <Link to={path}><li>{notification.sender} {notification.type === 'like' ? 'liked': 'commented on'} your blog</li></Link>
        })
    }
    return (
        <div>
            <h1>Bloggy</h1>
            <button onClick={props.logout}>Logout</button>
            <NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
            <NavLink to="/add" activeClassName="is-active">Add Blog</NavLink>
            <NavLink to="/myblogs" activeClassName="is-active">My Blogs</NavLink>
            <NavLink to="/user" activeClassName="is-active">{props.userHandle}</NavLink>
            <button onClick={onClick}>Notifications</button>
            {toggle && <ul>{getNotifications()}</ul>}
            
        </div>
    );
}

const mapStateToProps = (state) => ({
    notifications: state.auth.notifications,
    userHandle: state.auth.userHandle
})
const mapDispatchToProps = (dispatch) => {
    return {
      logout: ()=> dispatch(startLogout())
    };
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Header);