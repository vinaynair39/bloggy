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
        <div className="header">
            <div className="header__content">
                <div >
                    <Link to="/dashboard" className="header__title"><h1 >Bloggy</h1></Link>
                </div>
                <nav role="navigation">
                    <div className="header__links">
                        <input type="checkbox" id="toggle"/>
                        <span></span>
                        <span></span>
                        <span></span>
                    
                        <ul className="menu">
                            <NavLink to="/add" activeClassName="is-active">Add Blogs</NavLink>
                            <NavLink to="/myblogs" activeClassName="is-active">My Blogs</NavLink>
                            <NavLink to="/user" activeClassName="is-active">{props.userHandle}</NavLink>
                            <button onClick={props.logout}>Logout</button>
                            <button onClick={onClick}>Notifications</button> 
                        </ul>  
                    </div>
                </nav>
                {toggle && <ul>{getNotifications()}</ul>}
            </div>
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