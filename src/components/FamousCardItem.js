import React from 'react';
import Link from 'react-router-dom/Link';
import {connect} from 'react-redux';
import {followUser, unfollowUser} from '../actions/auth';
const FamousCard = ({name, userHandle, imageUrl, followUser, unfollowUser}) => {

    const onFollowUser = () => {
        followUser(userHandle);
    }
    return(
        <div className=''>
            <Link to={`/user/${userHandle}`}>
            <div>
                <img src={imageUrl} alt=""/>
            </div>
            <div className="famous-card__body-name">
                <h3>{name}</h3>
            </div>
            <div>
                <h4>{userHandle}</h4>
            </div>
            </Link>
            <div>
                <button onClick={onFollowUser}>Follow</button>
            </div>
            
        </div>
    );
}

const mapStateToDispatch = (dispatch) => ({
    followUser: (recipient) => dispatch(followUser(recipient)),
    unfollowUser: (recipient) => dispatch(unfollowUser(recipient))

})
export default connect(undefined, mapStateToDispatch)(FamousCard);