import React from 'react';
import MyBlogList from './MyBlogList';
import UserDetails from './UserDetails';
import {history} from '../routers/AppRouter';

const MyBlogsPage = (props) => (
    <div>
        <UserDetails handle={props.match.params.handle}/>
        <MyBlogList handle={props.match.params.handle}/>
    </div>
)

export default MyBlogsPage;