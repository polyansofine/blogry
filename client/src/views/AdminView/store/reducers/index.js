import { combineReducers } from "redux";
import { category } from "./category.reducer";
// import register from "./register.reducer";
// import user from "./user.reducer";

const adminReducers = combineReducers({
  category,
});

export default adminReducers;
