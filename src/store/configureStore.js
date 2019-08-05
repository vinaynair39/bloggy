import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import blogReducer from '../reducers/Blogs';
import authReducer from '../reducers/Auth'
// import filtersReducer from '../Reducers/Filters';
// import authReducer from '../Reducers/Auth';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      blogs: blogReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
