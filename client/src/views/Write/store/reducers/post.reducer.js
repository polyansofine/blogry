import * as Actions from "../actions";

const initialState = {
  post: {
    data: {
      postContent: "hh",
    },
  },
};

export const post = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_POST: {
      return {
        ...state,
        post: action.payload,
      };
    }

    default:
      return state;
  }
};
