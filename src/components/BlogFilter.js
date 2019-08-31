import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByLikes} from '../actions/filters';

const BlogFilter = (props) => {
    return (
      <div className="input-group">
        <div className="input-group__item">
          <input
            type="text"
            value={props.filters.text}
            onChange={(e) => {
              props.dispatch(setTextFilter(e.target.value));
            }}
          />
        </div>
        <div className="input-group__item">
          <select
            value={props.filters.sortBy}
            onChange={(e) => {
              if (e.target.value === 'date') {
                props.dispatch(sortByDate());
              } else if (e.target.value === 'likes') {
                props.dispatch(sortByLikes());
              }
            }}
          >
          <option value="likes">Likes</option>
          <option value="date">Recent</option>
            
          </select>
        </div>
      </div>
    );
  }

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps)(BlogFilter);