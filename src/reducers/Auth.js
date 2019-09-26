const initialState = {
    isAuthenticated: false,
    loading: false,
    userHandle: '',
    userBlogs: [],
    user: {},
    notifications: [],
    follows: {
        following: [''],
        followers: ['']
    },
    checkLike: false
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
        case 'GET_USER_BLOGS':
            return {
                ...state,
                userBlogs: action.blogs.map(blog => blog)
            };
        case 'ADD_USER_IMAGE':
            return {
                ...state,
                user: {
                    ...state.user,
                    imageUrl: action.imageUrl
                }
            }
        case 'ADD_USER_DETAILS':
           return {
               ...state,
               user: {
                   ...state.user,
                   bio: action.details.bio,
                   website: action.details.website
               }
           }
        case 'GET_AUTHENTICATED_USER':
            return {
                ...state,
                user: action.user,
                notifications: action.notifications,
                follows: action.follows
            }
        case 'CHECK_LIKE_BLOG':
        return {
            ...state,
            checkLike: action.condition,
        }

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
