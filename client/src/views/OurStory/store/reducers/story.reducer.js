import * as Actions from "../actions";

const initialState = {
  stories: [],
  story: [],
};

export const stories = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_STORIES: {
      return {
        ...state,
        stories: action.payload,
      };
    }
    case Actions.GET_STORY: {
      return {
        ...state,
        story: action.payload,
      };
    }
    case Actions.ADD_LIKE: {
      return {
        ...state,
        story: action.payload,
      };
    }
    case Actions.GET_FILTER_CATEGORIES: {
      return {
        ...state,
        stories: action.payload,
      };
    }

    default:
      return state;
  }
};
