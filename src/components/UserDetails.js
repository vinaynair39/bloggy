import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {history} from '../routers/AppRouter'
export const UserDetails = ({user}) => {


    return(
        <div>
            <Link to="edit"><button>Edit Profile</button></Link>
            <img src={user.imageUrl} alt="" />
            <h2>{user.name && user.name}</h2>
            <h3>userHandle: {user.userHandle}</h3>
            <h3>email: {user.email}</h3>
            {history.path}
            {user.bio && <h3>bio: {user.bio}</h3>}
            {user.email && <h3>website: {user.website}</h3>}
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})
export default connect(mapStateToProps)(UserDetails);