import { combineReducers } from "redux";
import { post } from "./post.reducer";
// import register from "./register.reducer";
// import user from "./user.reducer";

const postReducers = combineReducers({
  post,
});

export default postReducers;
