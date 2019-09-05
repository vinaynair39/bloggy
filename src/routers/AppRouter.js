import React from 'react';
import {Router, Switch} from 'react-router-dom';
import {createBrowserHistory as createHistory} from 'history'
import DashboardPage from '../components/DashboardPage';
import AddBlogPage from '../components/AddBlogPage';
import EditBlogPage from '../components/EditBlogPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import MyBlogsPage from '../components/MyBlogsPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import BlogCard from '../components/BlogCard'
import SignupPage from '../components/SignupPage';
import EditUserDetails from '../components/EditUserDetails'
import UserDetails from '../components/UserDetails'


export const history = createHistory();
const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <PublicRoute path='/' component={LoginPage} exact={true}></PublicRoute>
            <PublicRoute path='/signup' component={SignupPage}></PublicRoute>
            <PrivateRoute path='/dashboard' component={DashboardPage}></PrivateRoute>
            <PrivateRoute path='/user' component={UserDetails} exact={true}></PrivateRoute>
            <PrivateRoute path='/edit' component={EditUserDetails} exact={true}></PrivateRoute>
            <PrivateRoute path='/myblogs' component={MyBlogsPage}></PrivateRoute>
            <PrivateRoute path='/user/:handle' component={MyBlogsPage}></PrivateRoute>
            <PrivateRoute path='/blog/:id' component={BlogCard}></PrivateRoute>
            <PrivateRoute path='/add' component={AddBlogPage}></PrivateRoute>
            <PrivateRoute path='/edit/:id' component={EditBlogPage}></PrivateRoute>
            <PrivateRoute component={NotFoundPage}></PrivateRoute>
        </Switch>
    </Router>
);

export default AppRouter;