import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {startGetUserDetails} from '../actions/auth';
export const UserDetails = ({user, handle,getUserDetails, follows}) => {
    
    const [userData, setUserData] = useState([]);
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    useEffect(() => {
        if(handle){
            getUserDetails(handle).then(data => {
                setUserData(data.user);
                setFollowers(data.follows.followers);
                setFollowing(data.follows.following);
            });

        }

    },[])

    return(
        <div className="my-blogs__user-card">
            <img src={userData.imageUrl || user.imageUrl} alt="" />
            <h2>{(userData.name && userData.name) || (user.name && user.name)}</h2>
            <h3>userHandle: {userData.userHandle || user.userHandle}</h3>
            <h3>Followers:{followers.length || follows.followers.length}</h3>
            <h3>Following:{following.length || follows.following.length}</h3>
            {(userData.bio && <h3>bio: {userData.bio}</h3>)||(user.bio && <h3>bio: {user.bio}</h3>)}
            <div>
                <label>website: </label>{(userData.website && (<a href={userData.website} alt="">{userData.website}</a>))||(user.website && <a href={user.website} alt="">{user.website}</a>)}
            </div>
            <Link to="edit"><button>Edit Profile</button></Link>
        </div>
    );
}

const mapStateToProps = (state,props) => ({
    user: props.handle ? '' : state.auth.user,
    follows: state.auth.follows
})
const mapDispatchToProps = (dispatch) => ({
    getUserDetails: (handle) => dispatch(startGetUserDetails(handle)),  
})
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);