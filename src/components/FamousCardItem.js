import React, {useEffect, useState} from 'react';
import Link from 'react-router-dom/Link';
import {connect} from 'react-redux';
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {followUser, unfollowUser, getFollowsOf} from '../actions/auth';
const FamousCard = ({name, userHandle, imageUrl, followUser, unfollowUser, getFollows, isFollowing , currentUserHandle}) => {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [checkFollowing, setCheckFollowing] = useState(!!isFollowing);
    
    useEffect(() => {
        getFollows(userHandle).then((data)=>{
            setFollowers(data.followers.length);
            setFollowing(data.following.length);
        })
    },[])

    const onFollowUser = () => {
        followUser(userHandle);
        setCheckFollowing(true);
        setFollowers(followers + 1)
    }
    
    const onUnfollowUser = () => {
        unfollowUser(userHandle);
        setCheckFollowing(false);
        setFollowers(followers - 1)
    }

    return(
        <div className='famous-card__body-content'>
            <div className="famous-card__body-image"> 
                <div>
                    <img src={imageUrl} alt=""/>
                </div>
                {userHandle !== currentUserHandle ? <div className="famous-card__body-content-button">
                    {checkFollowing ? (<button onClick={onUnfollowUser}>Unfollow <FontAwesomeIcon icon={faMinus} color="white"/></button>):
                    (<button className="follow" onClick={onFollowUser}>Follow <FontAwesomeIcon icon={faPlus} color="white"/></button> )}
                </div>: ''}
            </div>
            
            <div>
                <div className="famous-card__body-content-title">
                        <Link to={`/user/${userHandle}`}>
                            <h3>{userHandle}</h3>
                            <h4>vinay nair</h4>
                        </Link>
                </div>
                <div className="famous-card__body-content-follows">
                    followers:{followers}   following:{following} 
                </div>
            </div>
            
            
        </div>
    );
}

const mapStateToProps = (state,props) => ({
    isFollowing: state.auth.follows.following.find(follow => follow !== props.userHandle),
    currentUserHandle: state.auth.user.userHandle
})
const mapDispatchToProps = (dispatch) => ({
    followUser: (recipient) => dispatch(followUser(recipient)),
    unfollowUser: (recipient) => dispatch(unfollowUser(recipient)),
    getFollows: (userHandle) => dispatch(getFollowsOf(userHandle))

})
export default connect(mapStateToProps, mapDispatchToProps)(FamousCard);