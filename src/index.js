import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import AppRouter from './routers/AppRouter';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {login, logout} from './actions/auth';
import {startSetBlogs} from './actions/blogs';
import {history} from './routers/AppRouter';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import './index.css';

const store = configureStore();

const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('root'));
        hasRendered = true;
      }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));
const token = sessionStorage.getItem('FBIdToken');
console.log('miki' +token)
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
    else {
    console.log("hello boi");
    store.dispatch(login());
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(startSetBlogs()).then(() => {
        renderApp();
        if (history.location.pathname === '/') {
            history.push('/dashboard');
          }
    })
    }
}else{
    renderApp();
}


serviceWorker.unregister();
