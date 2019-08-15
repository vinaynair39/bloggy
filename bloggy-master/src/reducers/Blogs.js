const blogsReducer = (state = [], action) => {
    switch(action.type){
        case  'SET_BLOGS':
            return action.blogs;
        case 'ADD_BLOG':
            return [...state , action.blog];
        case 'REMOVE_BLOG':
            return state.filter((blog) => blog.id !== action.id);
        case 'GET_BLOG':
            return [...state]
        case 'EDIT_BLOG':
            return state.map((blog) => {
                if(action.id === blog.id){
                    return{
                        ...blog,
                        ...action.update
                    }
                };
                    return blog;
            });
        case 'LIKE_BLOG':
            const index1 = state.findIndex(blog => blog.id === action.id);
            state[index1].likeCount += 1;
            return state
        case 'UNLIKE_BLOG':
            let index2 = state.findIndex(blog => blog.id === action.id);
            state[index2].likeCount -= 1;
            return state
        default:
            return state;
    }
}

export default blogsReducer;