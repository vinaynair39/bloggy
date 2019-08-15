import React, {useState} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link'
import {setLikeBlog, setUnLikeBlog} from '../actions/blogs';
import Comments from './Comments'
export const BlogCard = (props) => {
    const [likeCount, setLikeCount] = useState(props.blog.likeCount)
    const id = props.match.params.id
    const onClickLike = () => {
        props.likeBlog(id).then(() => {
            setLikeCount(props.blog.likeCount)

        });
    };
    const onClickUnLike = () => {
        props.unLikeBlog(id).then(() => {
            setLikeCount(props.blog.likeCount)

        });
    };

    return(
        <div>
            {props.blog.userHandle === props.userHandle && <Link to={`../edit/${props.blog.id}`}>
            <button>Edit</button>
            </Link>
            }
            <h2>{props.blog.title}</h2><p>By: {props.blog.userHandle}</p> <p>{moment(props.blog.createdAt).format("Do MMM YYYY")}</p>
            <p>{props.blog.description}</p>
            <button 
            onClick={onClickLike}>Like{likeCount}
            </button>
            <button 
            onClick={onClickUnLike}>Unlike
            </button>
            <Comments commentCount={props.blog.commentCount} id={id} />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    likeBlog: (blogId) => dispatch(setLikeBlog(blogId)),
    unLikeBlog: (blogId) => dispatch(setUnLikeBlog(blogId)),
    
});

const mapStateToProps = (state, props) => ({
    blog: state.blogs.find(blog => blog.id === props.match.params.id),
    userHandle : state.auth.userHandle
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogCard);