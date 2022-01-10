import * as Actions from "../actions";

const initialState = {
  comments: [],
};

export const comments = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_COMMENT: {
      return {
        ...state,
        comments: action.payload,
      };
    }

    default:
      return state;
  }
};
