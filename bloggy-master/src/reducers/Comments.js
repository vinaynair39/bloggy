const commentsReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_COMMENT':
            return [...state , action.comment];
        case 'REMOVE_COMMENT':
            return state.filter((comment) => comment.id !== action.id);
        case 'GET_COMMENTS':
            return action.comments;
        case 'EDIT_COMMENT':
            return state.map((comment) => {
                if(action.id === comment.id){
                    return{
                        ...comment,
                        ...action.updates
                    }
                };
                    return comment;
            });
        default:
            return state;
    }
}

export default commentsReducer;