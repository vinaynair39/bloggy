import  database  from '../firebase/firebase';
import {history} from '../routers/AppRouter';
import axios from 'axios';


export const addBlog = (blog) => ({
    type: 'ADD_BLOG',
    blog
});

export const startAddBlog = (blogData = {}) => {
    return (dispatch,getState) => {
        axios.post('/add', blogData).then((res) => {
            dispatch(addBlog(res.data));
        }).catch(err => {
            console.log(err.response)
        })
    }
}

export const removeBlog = (id) => ({
    type: 'REMOVE_BLOG',
    id
});

export const startRemoveBlog = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        database.collection(`blogList/users/${uid}`).doc(id).delete().then(() => {
            dispatch(removeBlog(id));
        }).then(() => history.push('/'));
    }
}

export const editBlog = (id, update) => ({
    type: 'EDIT_BLOG',
    id,
    update
});

export const startEditBlog = (id, update={}) => {
    return (dispatch,getState) => {
        const uid = getState().auth.uid;
        return database.collection(`blogList/users/${uid}`).doc(id).update({
            ...update
        }).then(ref => {
            dispatch(editBlog(id, update))
        })
    }

}

export const setBlogs = (blogs) => {
    return {
      type: "SET_BLOGS",
      blogs
    };
  }

export const startSetBlogs = () => {
    return (dispatch) => {
        return axios.get('/blogs').then(res => {
            dispatch(setBlogs(res.data));
        })
    }
};

export const likeBlog = (likes) => {
    return {
      type: "LIKE_BLOG",
      likes
    };
  }

export const setLikeBlog = (blogId) => {
    return (dispatch) => {
        return axios.post(`${blogId}/like`).then((res) => {
            dispatch(likeBlog(res.data))
        }).catch(err => console.log(err))
    }
}


export const getBlog = (comments) => {
    return {
      type: "GET_BLOG",
      comments
    };
  }

export const startGetBlog = (blogId) => {
    return (dispatch) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        return axios.get(`${blogId}/comments`, { cancelToken: source.token }).then((res) => {
            return res.data;
        }).catch(err => console.log(err))
    }
}


