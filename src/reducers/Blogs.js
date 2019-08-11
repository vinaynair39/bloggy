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
                        ...action.updates
                    }
                };
                    return blog;
            });
        default:
            return state;
    }
}

export default blogsReducer;