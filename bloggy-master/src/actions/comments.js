import axios from 'axios';

export const getComments = (comments) => {
    return {
      type: "GET_COMMENTS",
      comments
    };
  }

export const startGetComments = (id) => {
    return (dispatch) => {
        return axios.get(`../blog/${id}/comments`).then(res => {
            dispatch(getComments(res.data));
            return res.data;
        })
    }
}

export const addComment = (comment ={}) => {
    return {
        type: "ADD_COMMENT",
        comment
      };
}

export const startAddComment = (id, comment) => {
    return (dispatch) => {
        return axios.post(`../blog/${id}/comment`,comment).then(res => {
            dispatch(addComment(res.data));
        })
    }
}