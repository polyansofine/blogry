import { combineReducers } from "redux";
import { profile } from "./profile.reducer";
// import register from "./register.reducer";
// import user from "./user.reducer";

const profileReducers = combineReducers({
  profile,
});

export default profileReducers;
