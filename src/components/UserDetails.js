import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {history} from '../routers/AppRouter';
import {startGetUserDetails, getFollows} from '../actions/auth';
export const UserDetails = ({user, handle,getUserDetails, getFollows}) => {
    
    const [userData, setUserData] = useState([]);
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    useEffect(() => {
        if(handle){
            getUserDetails(handle).then(data => {
                setUserData(data);
            });

        }
        getFollows().then(data => {
            setFollowers(data.followers);
            setFollowing(data.following);
        })
    },[])

    return(
        <div>
            <Link to="edit"><button>Edit Profile</button></Link>
            <img src={userData.imageUrl || user.imageUrl} alt="" />
            <h2>{(userData.name && userData.name) || (user.name && user.name)}</h2>
            <h3>userHandle: {userData.userHandle || user.userHandle}</h3>
            <h3>Followers:{followers.length}</h3>
            <h3>Following:{following.length}</h3>
            <h3>email: {userData.email || user.email}</h3>
            {history.path}
            {(userData.bio && <h3>bio: {userData.bio}</h3>)||(user.bio && <h3>bio: {user.bio}</h3>)}
            {(userData.email && <h3>website: {userData.website}</h3>)||(user.email && <h3>website: {user.website}</h3>)}
        </div>
    );
}

const mapStateToProps = (state,props) => ({
    user: props.handle ? '' : state.auth.user
})
const mapDispatchToProps = (dispatch) => ({
    getUserDetails: (handle) => dispatch(startGetUserDetails(handle)),
    getFollows: () => dispatch(getFollows())
})
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);