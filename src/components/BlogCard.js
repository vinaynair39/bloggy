import React, {useState,useEffect} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link'
import {setLikeBlog, setUnLikeBlog,} from '../actions/blogs';
import {setCheckLikeBlog} from '../actions/auth';
import Comments from './Comments'
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const BlogCard = (props) => {
    const [likeCount, setLikeCount] = useState(props.blog.likeCount);
    const [checkLike, setCheckLike] = useState(props.checkLike)
    const id = props.match.params.id;

    useEffect(() => {
        props.checkLikeBlog(id);
        console.log(checkLike)
    },[likeCount])

    const onClickLike = () => {
        props.likeBlog(id).then(() => {
            setLikeCount(likeCount + 1);
            setCheckLike(true)
        });
    };

    const onClickUnLike = () => {
        props.unLikeBlog(id).then(() => {
            setLikeCount(likeCount - 1);
            setCheckLike(false)
        });
    };

    return(
        <div className="content-container blog-card">
            {/* {props.blog.userHandle === props.userHandle && <Link to={`../edit/${props.blog.id}`}>
            <button>Edit</button>
            </Link>
            } */}
            <div>
                <h2>{props.blog.title}</h2>
                <p>By: {props.blog.userHandle}</p> 
                <p>{moment(props.blog.createdAt).format("Do MMM YYYY")}</p>
            </div>
            <div>
                <img src={props.blog.imageUrl} alt=""/>
            </div>
            <div>
                <p>{props.blog.description}</p>
            </div>
            {checkLike ? (<button className="btn-secondary like-review" onClick={onClickUnLike}>Unlike</button>) : (
            <button className="btn-primary like-review" onClick={onClickLike}><FontAwesomeIcon icon={faHeart}/>{checkLike ? likeCount + " you liked this blog!": likeCount}</button>) }
            {/* <button className="btn-secondary like-review"
            onClick={onClickLike}><FontAwesomeIcon icon={faHeart}/>{checkLike ? likeCount + " you liked this blog!": likeCount}
            </button>
            <button 
            onClick={onClickUnLike}>Unlike */}
            {/* </button> */}
            <Comments commentCount={props.blog.commentCount} id={id} />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    likeBlog: (blogId) => dispatch(setLikeBlog(blogId)),
    unLikeBlog: (blogId) => dispatch(setUnLikeBlog(blogId)),
    checkLikeBlog: (blogId) => dispatch(setCheckLikeBlog(blogId)),    
});

const mapStateToProps = (state, props) => ({
    blog: state.blogs.find(blog => blog.id === props.match.params.id),
    userHandle : state.auth.userHandle,
    checkLike: state.auth.checkLike
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogCard);