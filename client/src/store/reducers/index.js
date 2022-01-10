import { combineReducers } from "redux";
import auth from "../../views/LoginPage/store/reducers";
import post from "../../views/Write/store/reducers";
import fuse from "./fuse";
import stories from "../../views/OurStory/store/reducers";
import profile from "../../views/ProfilePage/store/reducers";
import admin from "../../views/AdminView/store/reducers";
const createReducer = (asyncReducers) =>
  combineReducers({
    auth,
    post,
    fuse,
    stories,
    profile,
    admin,
    ...asyncReducers,
  });

export default createReducer;
