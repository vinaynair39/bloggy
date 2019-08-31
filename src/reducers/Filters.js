
const defaultFiltersState = {
    text: "",
    sortBy: "likes", //date or likes
  };

const filterReducer = (state = defaultFiltersState, action) => {
    switch (action.type) {
        case "ADD_TEXT_FILTER":
            return {
                ...state,
                text: action.text
            };
        case "SORT_BY_LIKES":
            return {
                ...state,
                sortBy: 'likes'
            };
        case "SORT_BY_DATE":
            return {
                ...state,
                sortBy: 'date'
            };
            default:
                return state;
        }
  };

export default filterReducer;