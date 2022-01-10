import * as Actions from "../actions";
import * as profileActions from "../../../ProfilePage/store/actions";
const initialState = {
  success: false,
  error: {
    username: null,
    password: null,
  },
  username: "",
  id: "",
  email: "",
  avatar: "",
  isAuthenticated: false,
  // password: "",
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOGIN_SUCCESS: {
      return {
        success: true,
        avatar: action.payload.data.user.avatar,
      };
    }
    case Actions.LOGIN_ERROR: {
      return {
        success: false,
        error: action.payload,
      };
    }
    case Actions.SIGN_OUT: {
      return {
        success: false,
        isAutenticated: false,
        // error: action.payload,
      };
    }
    case Actions.SET_USER: {
      return {
        ...state,
        username: action.payload.name,
        email: action.payload.email,
        id: action.payload._id,
        avatar: action.payload.avatar,
        isAuthenticated: action.payload._id ? true : false,

        // error: action.payload,
      };
    }
    case profileActions.UPDATE_AVATAR: {
      return {
        ...state,
        avatar: action.payload.avatar,
      };
    }
    default: {
      return state;
    }
  }
};

export default login;
