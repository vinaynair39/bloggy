import React, {useState} from 'react';
import BlogForm from './BlogForm'
import {connect} from 'react-redux';
import {startEditBlog} from '../actions/blogs'
import {startRemoveBlog} from '../actions/blogs';


const EditBlogPage= (props) => {


    const onSubmit = (update) => {
        props.editBlog(props.blog.id, update);
        
    }

    const removeBlog = () => {
        if(window.confirm('Are you sure you want to delete this blog?'))
            props.removeBlog(props.blog.id);
    }

    return(
        <div>
            <button onClick={removeBlog}>Remove</button>
            <BlogForm onSubmit={onSubmit}
            blog={props.blog}/>
        </div>
    )
}



const mapStateToProps = (state, props) => {
    return {
        blog: state.blogs.find((blog) => blog.id === props.match.params.id)
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        editBlog: (id,blog) => dispatch(startEditBlog(id ,blog)),
        removeBlog: (id) => dispatch(startRemoveBlog(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditBlogPage);