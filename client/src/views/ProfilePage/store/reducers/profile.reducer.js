import * as Actions from "../actions";

const initialState = {
  profile: [],
};

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_PROFILE: {
      return {
        ...state,
        profile: action.payload,
      };
    }

    default:
      return state;
  }
};
