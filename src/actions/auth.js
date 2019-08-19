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

export const signup = () => {
    return {
        type: 'SIGNUP'
    };
}

export const startSignUp = (credentials) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_UI'});
        axios.post('/signup', credentials).then((res) => {
            setAuthorizationHeader(res.data.token);
            dispatch({type: 'UNLOADING_UI'});
            dispatch(startGetUserHandle()).then(() => {
                dispatch(login());
                dispatch(startSetBlogs()).then(() => {
                    if (history.location.pathname === '/') {
                        history.push('/dashboard');
                    }
            })
            })
            
            }).catch(err => {
                console.log(err.response)
                dispatch({
                    type: 'SET_ERRORS',
                    error: err.response ? (err.response.data.general || err.response.data.email || err.response.data.password) : ''
                })
            });

    }
}
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
            dispatch(startGetUserHandle()).then(() => {
                dispatch(login());
                dispatch(startGetAuthenticatedUser());
                dispatch(startSetBlogs()).then(() => {
                    dispatch({type: 'UNLOADING_UI'});
                    if (history.location.pathname === '/') {
                        history.push('/dashboard');
                    }
            })
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
        sessionStorage.removeItem('userHandle');
        delete axios.defaults.headers.common['Authorization'];
        dispatch(logout());
    };
};

function setAuthorizationHeader(token){
    const FBIdToken = `Bearer ${token}`;
    sessionStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const getUserHandle =  (userHandle) => {
    return{
        type: 'GET_USERHANDLE',
        userHandle
    };
};
export const startGetUserHandle =  () => {
    return (dispatch) => {
        return axios.get('/userHandle').then(async res => {
            dispatch(getUserHandle(res.data))
            await sessionStorage.setItem('userHandle', res.data)
        }).catch(err => console.log(err.response))
    }
};


export const getUserBlogs =  (blogs) => {
    return{
        type: 'GET_USER_BLOGS',
        blogs
    };
};
export const startGetUserBlogs =  (userHandle) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_UI'});
        return axios.get(`/user/${userHandle}`).then(({data}) => {
            dispatch(getUserBlogs(data.blogs))
            dispatch({type: 'UNLOADING_UI'});
        }).catch(err => console.log(err.response))
    }
};


export const getAuthenticatedUser =  (user, notifications) => {
    return{
        type: 'GET_AUTHENTICATED_USER',
        user,
        notifications
    };
};
export const startGetAuthenticatedUser =  () => {
    return (dispatch) => {
        return axios.get(`/user`).then(res => {
            dispatch(getAuthenticatedUser(res.data.credentials, res.data.notifications))
        }).catch(err => console.log(err.response))
    }
};


export const addUserData = (details) => {
    return {
        type: "ADD_USER_DETAILS",
        details
    };
}

export const startAddUserDetails =  (details) => {
    return (dispatch) => {
        return axios.post(`/user`, details).then(res => {
            dispatch(addUserData(details));
            history.goBack();
        }).catch(err => console.log(err.response))
    }
};

export const addUserImage = (imageUrl) => {
    return {
        type: "ADD_USER_IMAGE",
        imageUrl
    };
}

export const startAddUserImage =  (formData) => {
    return (dispatch) => {
        return axios.post(`/user/image`, formData).then(res => {
            console.log('hi')
            dispatch(addUserImage(res.data.imageUrl));
            // history.goBack();
        }).catch(err => console.log(err.response))
    }
};