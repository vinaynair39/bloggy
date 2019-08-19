import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import BlogListItem from './BlogListItem';
import {startGetUserBlogs} from '../actions/auth';


export const MyBlogList = (props) => {

    useEffect(() => {
        props.getUserBlogs(props.userHandle)
    }, [])

    // // async function load() {
    // //     setLoading(true)
    // //     await props.getUser(userHandle).then(() => {
    // //         setLoading(false)
    // //     })
    // // }
    // const onSetBlogs = () => {
    //     setBlogs(props.blogs)
    // }
    
    return (
        <div>
             {props.blogs.length === 0 ? (<p>no blogs..</p>) : (props.blogs.map((blog) => {
                return <BlogListItem key={blog.id} {...blog} />
            }))}
        </div>
    )
}

const mapStateToProps = (state) => ({
    userHandle: state.auth.userHandle,
    blogs: state.auth.userBlogs ? state.auth.userBlogs : []
    // blogs: state.blogs.filter((blog) => {
    //     if(blog.userHandle === state.auth.userHandle)
    //         return blog;
    // })
});
const mapDispatchToProps = (dispatch) => ({
    getUserBlogs: (userHandle) => dispatch(startGetUserBlogs(userHandle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyBlogList);