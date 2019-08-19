import React from 'react';
import MyBlogList from './MyBlogList';
import UserDetails from './UserDetails';
import {history} from '../routers/AppRouter';

const MyBlogsPage = () => (
    <div>
        <UserDetails/>
        <MyBlogList/>
    </div>
)

export default MyBlogsPage;