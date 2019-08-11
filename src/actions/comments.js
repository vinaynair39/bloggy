import axios from 'axios';

export const getComments = (comments) => {
    return {
      type: "GET_COMMENTS",
      comments
    };
  }

export const startGetComments = (id) => {
    return (dispatch) => {
        return axios.get(`${id}/comments`).then(res => {
            dispatch(getComments(res.data));
        })
    }
}