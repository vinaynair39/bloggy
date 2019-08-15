import React from 'react';
import {connect} from 'react-redux';
import BlogListItem from './BlogListItem';

export const BlogList = (props) => (
    <div>
        {props.blogs.length === 0 ? (<p>No blogs</p>) : (props.blogs.map((blog) => {
            return <BlogListItem key={blog.id} {...blog} />
        }))}
    </div>
)

const mapStateToProps = (state) => ({
    blogs: state.blogs
});

export default connect(mapStateToProps)(BlogList);