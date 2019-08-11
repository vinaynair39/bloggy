import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {setLikeBlog, startGetBlog} from '../actions/blogs';
import axios from 'axios';
export const BlogCard = (props) => {
    const id = props.match.params.id
    const [comments, setComments] = useState([]);

    async function getComments(blogId) {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const result = await axios.get(`${blogId}/comments`, { cancelToken: source.token })
        setComments(result);
    }
    useEffect((comments, id) => {
        getComments(id);
        console.log(comments);
    }, []);

    const onClick = () => {
        props.likeBlog(id);
    }
    return(
        <div>
            <h2>{props.blog.title}</h2><p>By: {props.blog.userHandle}</p> <p>{moment(props.blog.createdAt).format("Do MMM YYYY")}</p>
            <p>{props.blog.description}</p>
            <button 
            onClick={onClick}>
            </button>
            {comments.forEach(comment => (<li>{comment}</li>))}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getBlog: (blogId) => dispatch(startGetBlog(blogId)),
    likeBlog: (blogId) => dispatch(setLikeBlog(blogId)),
    
});

const mapStateToProps = (state, props) => ({
    blog: state.blogs.find((blog) => blog.id === props.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogCard);