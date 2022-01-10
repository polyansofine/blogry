import { combineReducers } from "redux";
import login from "./login.reducer";
import register from "./register.reducer";
// import register from "./register.reducer";
// import user from "./user.reducer";

const authReducers = combineReducers({
  login,
  register,
});

export default authReducers;
