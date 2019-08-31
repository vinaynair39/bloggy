export const setTextFilter = (text = '') => ({
    type: "ADD_TEXT_FILTER",
    text
  });
  
  export const sortByLikes = () => ({
    type: "SORT_BY_LIKES",
  });

  export const sortByDate = () => ({
    type: "SORT_BY_DATE",
  });
  