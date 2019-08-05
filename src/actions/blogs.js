import  database  from '../firebase/firebase';
import {history} from '../routers/AppRouter';


export const addBlog = (blog) => ({
    type: 'ADD_BLOG',
    blog
});

export const startAddBlog = (blogData = {}) => {
    return (dispatch,getState) => {
        const uid = getState().auth.uid;
        return database.collection(`blogList/users/${uid}`).add({
            ...blogData
          }).then(ref => {
            console.log('tolo' + ref.id);
            dispatch(addBlog({
                id: ref.id,
                ...blogData
              }));
          }).then(() => history.push('/'));
    
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
    return (dispatch, getState) => {
        let allBlogs = [];
        const uid = getState().auth.uid;
        return database.collection(`blogList/users/${uid}`).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                allBlogs.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            console.log(allBlogs);
            dispatch(setBlogs(allBlogs));
        });
    }
};

// export const startSetBlogs = () => {
//     return (dispatch) => {
//         let allBlogs = [];
//         return database.collection(`blogList`).doc('users').onSnapshot((snapshot) => {
//             console.log(""+snapshot);
//             snapshot.docs.forEach(doc => {
//                 allBlogs.push({
//                     id: doc.id,
//                     ...doc.data()
//                 });
//             });
//         })
//         dispatch(setBlogs(allBlogs));
//     }
// };