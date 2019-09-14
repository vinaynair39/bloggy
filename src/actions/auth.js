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
            dispatch(startGetUserHandle()).then(() => {
                dispatch(startGetAuthenticatedUser()).then(() => {
                    dispatch(login());
                    dispatch({type: 'UNLOADING_UI'});
                })
                dispatch(startSetBlogs()).then(() => {
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
                dispatch(startGetAuthenticatedUser()).then(() => {
                    dispatch(login());
                })
                dispatch(startSetBlogs()).then(() => {
                    dispatch({type: 'UNLOADING_UI'});
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

export const startGetUserDetails =  (userHandle) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_UI'});
        return axios.get(`/user/${userHandle}`).then(({data}) => {
            console.log(data);
            const userData = {
                user: data.user,
                follows: data.follows
            }
            dispatch({type: 'UNLOADING_UI'});
            return userData;
        }).catch(err => console.log(err.response))
    }
};



export const getAuthenticatedUser =  (user, notifications,follows) => {
    return{
        type: 'GET_AUTHENTICATED_USER',
        user,
        notifications,
        follows
    };
};
export const startGetAuthenticatedUser =  () => {
    return (dispatch) => {
        return axios.get(`/user`).then(res => {
            dispatch(getAuthenticatedUser(res.data.credentials, res.data.notifications,res.data.follows))
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
        imageUrl: imageUrl
    };
}

export const startAddUserImage =  (formData) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_UI'});
        console.log(formData);
        return axios.post(`/user/image`, formData).then(res => {
            dispatch(addUserImage(res.data));
            dispatch({type: 'UNLOADING_UI'});
            return res.data;
            // history.goBack();
        }).catch(err => console.log(err.response))
    }
};

export const checkLikeBlog = (condition) => {
    return {
      type: "CHECK_LIKE_BLOG",
      condition
    };
  }

export const setCheckLikeBlog = (blogId) => {
    return (dispatch) => {
        return axios.get(`${blogId}/checkLike`).then((res) => {
            dispatch(checkLikeBlog(res.data))
        }).catch(err => {
            if(err.response)
                alert(err.response.data)
            console.log(err)
        })
    }
}


export const followUser = (recipient) => {
    return (dispatch) => {
        return axios.post(`../follow`,{recipient}).then((res) => {
            return res.data;
        }).catch(err => {
            if(err.response)
                alert(err.response.data)
            console.log(err)
        })
    }
}




export const unfollowUser = (recipient) => {
    return (dispatch) => {
        return axios.post(`../unfollow`,{recipient}).then((res) => {
            return res.data;
        }).catch(err => {
            if(err.response)
                alert(err.response.data)
            console.log(err)
        })
    }
}

export const getFollows = () => {
    return (dispatch) => {
        return axios.get(`../getFollows`).then((res) => {
            return res.data;
        }).catch(err => {
            if(err.response)
                console.log(err)
        })
    }
}
export const getFollowsOf = (recipient) => {
    return (dispatch) => {
        return axios.get(`../getFollows/${recipient}`).then((res) => {
            return res.data;
        }).catch(err => {
            if(err.response)
                console.log(err)
        })
    }
}
