import { combineReducers } from "redux";
import { stories } from "./story.reducer";
// import register from "./register.reducer";
// import user from "./user.reducer";

const storyReducers = combineReducers({
  stories,
});

export default storyReducers;
