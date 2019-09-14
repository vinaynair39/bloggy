import React from 'react';
import BlogForm from './BlogForm'
import {connect} from 'react-redux';
import {startAddBlog} from '../actions/blogs'

export const AddBlogPage = ({addBlog, history}) => (
    <div>
        <div className="content-container">
        <BlogForm onSubmit = {(blog) => {
            addBlog(blog);
            history.push('/');
            }}/>
        </div>
       
    </div>
);

const mapDispatchToProps = (dispatch) => {
    return{
        addBlog: (blog) => dispatch(startAddBlog(blog))
    }
}
export default connect(undefined, mapDispatchToProps)(AddBlogPage);