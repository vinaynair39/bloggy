import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {setLikeBlog, setUnLikeBlog} from '../actions/blogs';
import {startGetComments} from '../actions/comments'
export const BlogCard = (props) => {
    const id = props.match.params.id
    useEffect(() =>{
        props.getComments(id);
    },[])

    const onClickLike = () => {
        props.likeBlog(id);
    }
    const onClickUnLike = () => {
        props.unLikeBlog(id);
    }
    return(
        <div>
            <h2>{props.blog.title}</h2><p>By: {props.blog.userHandle}</p> <p>{moment(props.blog.createdAt).format("Do MMM YYYY")}</p>
            <p>{props.blog.description}</p>
            <button 
            onClick={onClickLike}>Like{props.blog.likeCount}
            </button>
            <button 
            onClick={onClickUnLike}>Unlike
            </button>
            <ul>
                comments:
            {props.comments.map(comment => {
                return <li>{comment.body}</li>
            })}
            </ul>

        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getComments: (blogId) => dispatch(startGetComments(blogId)),
    likeBlog: (blogId) => dispatch(setLikeBlog(blogId)),
    unLikeBlog: (blogId) => dispatch(setUnLikeBlog(blogId)),
    
});

const mapStateToProps = (state, props) => ({
    blog: state.blogs.find((blog) => blog.id === props.match.params.id),
    comments: state.comments
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogCard);