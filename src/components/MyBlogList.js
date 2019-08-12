import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import BlogListItem from './BlogListItem';
import {startGetUser} from '../actions/auth';


export const MyBlogList = (props) => {

    const [loading, setLoading] = useState(false);
    const userHandle = props.userHandle ? props.userHandle : sessionStorage.getItem('userHandle');
    useEffect(() => {
        load();
    }, [])

    async function load() {
        setLoading(true)
        await props.getUser(userHandle).then(() => {
            setLoading(false)
        })
    }
    return (
        <div>
            {console.log(props.blog)}
             {loading ? (<p>No blogs</p>) : (props.blogs.map((blog) => {
                return <BlogListItem key={blog.id} {...blog} />
            }))}
        </div>
    )
}

const mapStateToProps = (state) => ({
    userHandle: state.auth.userHandle,
    blogs: state.blogs.find((blog) => blog.userHandle === 'ajay_LFC')
});
const mapDispatchToProps = (dispatch) => ({
    getUser: (userHandle) => dispatch(startGetUser(userHandle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyBlogList);