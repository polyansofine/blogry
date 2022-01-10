import * as categoryActions from "../actions";
const initialState = {
  category: [],
};

export const category = (state = initialState, action) => {
  switch (action.type) {
    case categoryActions.ADD_CATEGORY: {
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    }

    case categoryActions.GET_CATEGORIES: {
      return {
        ...state,
        category: action.payload,
      };
    }

    default:
      return state;
  }
};
