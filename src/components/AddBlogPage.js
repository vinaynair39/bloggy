import React from 'react';
import BlogForm from './BlogForm'
import {connect} from 'react-redux';
import {startAddBlog} from '../actions/blogs'

export const AddBlogPage = ({addBlog, history}) => (
    <div>
        Add Blog page
        <BlogForm onSubmit = {(blog) => {
            addBlog(blog);
            history.push('/');
            }}/>
    </div>
);

const mapDispatchToProps = (dispatch) => {
    return{
        addBlog: (blog) => dispatch(startAddBlog(blog))
    }
}
export default connect(undefined, mapDispatchToProps)(AddBlogPage);