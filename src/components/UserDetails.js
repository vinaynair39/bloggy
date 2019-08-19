import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
export const UserDetails = ({user}) => {


    return(
        <div>
            <Link to="edit"><button>Edit Profile</button></Link>
            <img src={user.imageUrl} alt="" />
            <h2>{user.name && user.name}</h2>
            <h3>userHandle: {user.userHandle}</h3>
            <h3>email: {user.email}</h3>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})
export default connect(mapStateToProps)(UserDetails);