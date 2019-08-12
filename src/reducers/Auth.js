const initialState = {
    isAuthenticated: false,
    loading: false,
    userHandle: '',
    user: {
        user: {},
        blogs: []
    }
}

const authReducer = (state=initialState , action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            return {
                isAuthenticated:false
            };

        case 'GET_USERHANDLE':
            return {
               ...state,
               userHandle: action.userHandle
            };
        case 'GET_USER':
            return {
                ...state,
                user: action.user
            };
        case 'LOADING_UI':
            return {
                ...state,
                loading: true,
            };
        case 'UNLOADING_UI':
            return {
            ...state,
            loading: false
        };
        case 'SET_ERRORS':
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case 'CLEAR_ERRORS':
            return {
                ...state,
                loading: false,
                error: null
            };    
        case 'UNSET_AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: false
            };
        default:
            return state;
    }
}

export default authReducer;