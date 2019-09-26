import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';
import {Link} from 'react-router-dom'
import { faPlus, faBlog,faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Header = (props) =>{

    const [toggle, setToggle] = useState(false);
    const onClick = ()=> {
        setToggle(!toggle)
     }

    const getNotifications = () => {
        return props.notifications.map(notification => {
            const path = notification.blogId ? '/blog/' + notification.blogId : '/dashboard';
            return <Link to={path}><li>{notification.sender} {notification.type === 'like' ? 'liked': 'commented on'} your blog</li></Link>
        })
    }
    return (
        <div className="header">
            <div className="header__content">
                <div >
                    <Link to="/dashboard" className="header__title"><h1 >Bloggy</h1></Link>
                </div>
                <div className="header__links" >
                    <input type="checkbox" id="toggler"/>
                    <div id="hamburger">
                        <div></div>
                    </div>
                        <div id="menu">
                            <div>
                                <div>
                                    <ul>
                                        <NavLink to="/add" activeClassName="is-active"><FontAwesomeIcon icon={faPlus}/> Add Blog</NavLink>
                                        <NavLink to="/myblogs" activeClassName="is-active"><FontAwesomeIcon icon={faBlog}/> My Blogs</NavLink>
                                        <button onClick={onClick}><FontAwesomeIcon icon={faBell} className="header__notification-button"/></button>
                                        <button onClick={props.logout} className="button-logout">Logout</button>
                                        
                                    </ul> 
                                </div>
                            </div>
                        </div>
 
                </div>
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