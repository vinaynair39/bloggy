// import React, {useEffect} from 'react';
import ReactDOM from 'react-dom'
import React from 'react';
import AppRouter from './routers/AppRouter';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {login, logout} from './actions/auth';
import {startSetBlogs} from './actions/blogs';
import {history} from './routers/AppRouter';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {connect} from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import './index.css';

export const App = (props) => {
    const store = configureStore();
    
    if(props.isAuth.isAuthenticated) {
        const token = sessionStorage.getItem('FBIdToken');
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            store.dispatch(logout());
            // renderApp();
            history.push('/');
        }
        else {
        console.log("hello boi");
        store.dispatch(login(token));
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(startSetBlogs()).then(() => {
            // renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        })
    }}
    return(
        <Provider store={store}>
          <AppRouter />
        </Provider>
    )
}

const mapStateToProps = (state) => ({
    isAuth : state.auth
})
export default (mapStateToProps)(App);