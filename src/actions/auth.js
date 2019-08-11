import {firebase} from '../firebase/firebase';
import axios from 'axios'

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
            dispatch(login());
            dispatch({type: 'UNLOADING_UI'});
            }).catch(err => {
                dispatch({
                    type: 'SET_ERRORS',
                    error: err.response.data.general || err.response.data.err
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
};