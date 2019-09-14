import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import BlogListItem from './BlogListItem';
import {startGetUserBlogs} from '../actions/auth';


export const MyBlogList = (props) => {
    useEffect(() => {   
        console.log('hey')
        props.getUserBlogs(props.handle || props.userHandle)
    },[])

    return (
        <>
             {props.blogs.length === 0 ? (<p>no blogs..</p>) : (props.blogs.map((blog) => {
                return <BlogListItem key={blog.id} {...blog} />
            }))}
        </>
    )
}

const mapStateToProps = (state) => ({
    userHandle: state.auth.userHandle,
    blogs: state.auth.userBlogs ? state.auth.userBlogs : []
});
const mapDispatchToProps = (dispatch) => ({
    getUserBlogs: (userHandle) => dispatch(startGetUserBlogs(userHandle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyBlogList);