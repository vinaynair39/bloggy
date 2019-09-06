import React from 'react';
import Link from 'react-router-dom/Link';
import {connect} from 'react-redux';
import {followUser, unfollowUser} from '../actions/auth';
const FamousCard = ({name, userHandle, imageUrl, followUser, unfollowUser}) => {

    const onFollowUser = () => {
        followUser(userHandle);
    }
    return(
        <div className='famous-card__body-content'>
            <div>
                <img src={imageUrl} alt=""/>
            </div>
            
            <div className="famous-card__body-content-title">
                <Link to={`/user/${userHandle}`}>
                    <h3>{userHandle}</h3>
                    <h4>vinay nair</h4>
                </Link>
            </div>
            <div className="">
                
            </div>
            <div className="famous-card__body-content-button">
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