import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import BlogListItem from './BlogListItem';
import {startGetUser} from '../actions/auth';


export const MyBlogList = (props) => {

    // const [loading, setLoading] = useState(false);
    // const [blogs, setBlogs] = useState([])
    // useEffect(() => {
    //     // load();
    //     onSetBlogs();
    // }, [])

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
    blogs: state.blogs.filter((blog) => {
        if(blog.userHandle === state.auth.userHandle)
            return blog;
    })
});
const mapDispatchToProps = (dispatch) => ({
    getUser: (userHandle) => dispatch(startGetUser(userHandle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyBlogList);