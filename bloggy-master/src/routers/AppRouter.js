import React from 'react';
import {Router, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import DashboardPage from '../components/DashboardPage';
import AddBlogPage from '../components/AddBlogPage';
import EditBlogPage from '../components/EditBlogPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import MyBlogsPage from '../components/MyBlogsPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import BlogCard from '../components/BlogCard'

export const history = createHistory();
const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <PublicRoute path='/' component={LoginPage} exact={true}></PublicRoute>
            <PrivateRoute path='/dashboard' component={DashboardPage}></PrivateRoute>
            <PrivateRoute path='/myblogs' component={MyBlogsPage}></PrivateRoute>
            <PrivateRoute path='/blog/:id' component={BlogCard}></PrivateRoute>
            <PrivateRoute path='/add' component={AddBlogPage}></PrivateRoute>
            <PrivateRoute path='/edit/:id' component={EditBlogPage}></PrivateRoute>
            <PrivateRoute component={NotFoundPage}></PrivateRoute>
        </Switch>
    </Router>
);

export default AppRouter;