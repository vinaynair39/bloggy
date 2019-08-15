import axios from 'axios'
import {startSetBlogs} from './blogs'
import {history} from '../routers/AppRouter';
export const login =  () => {
    return{
        type: 'LOGIN',
    };
};

export const logout =  () => {
    return{
        type: 'LOGOUT',
    };
};
export const startLoginUsingGoogle =  () => {
    return () => {
        axios.post('/signin').catch(err => {
            console.log(err);
        })
    };
};
export const startLogin =  (credentials) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_UI'});
        return axios.post('/login', credentials).then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch({type: 'UNLOADING_UI'});
            dispatch(login());
            dispatch(startGetUserHandle());
            dispatch(startSetBlogs()).then(() => {
                if (history.location.pathname === '/') {
                    history.push('/dashboard');
                  }
            
            })
            }).catch(err => {
                dispatch({
                    type: 'SET_ERRORS',
                    error: err.response ? (err.response.data.general || err.response.data.err ) : ''
                })
            });
}};

export const startLogout = () => {
    return (dispatch) => {
        sessionStorage.removeItem('FBIdToken');
        delete axios.defaults.headers.common['Authorization'];
        dispatch(logout());
    };
};

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    sessionStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
    axios.defaults.headers = {"Access-Control-Allow-Origin": "*"};
};

export const getUserHandle =  (userHandle) => {
    return{
        type: 'GET_USERHANDLE',
        userHandle
    };
};
export const startGetUserHandle =  () => {
    return (dispatch) => {
        return axios.get('/user').then(res => {
            dispatch(getUserHandle(res.data.credentials.userHandle))
            sessionStorage.setItem('userHandle', res.data.credentials.userHandle)
        }).catch(err => console.log(err.response))
    }
};


export const getUser =  (user) => {
    return{
        type: 'GET_USER',
        user
    };
};
export const startGetUser =  (userHandle) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_UI'});
        return axios.get(`/user/${userHandle}`).then(res => {
            dispatch(getUser(res.data))
            dispatch({type: 'UNLOADING_UI'});
        }).catch(err => console.log(err.response))
    }
};

