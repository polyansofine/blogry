import axios from "axios";
import { BaseURL } from "config/apiConfig";
import * as fuseActions from "store/actions";
export const GET_STORIES = "GET_STORIES";
export const GET_STORY = "GET_STORY";
export const ADD_LIKE = "ADD_LIKE";
export const GET_FILTER_CATEGORIES = "GET_FILTER_CATEGORIES";

export function getStories() {
  console.log("stories");
  const request = axios.get(`${BaseURL}/story/getstories`);
  // eslint-disable-next-line no-unused-vars
  return (dispatch) =>
    request
      .then((res) => {
        console.log(res);
        dispatch({
          type: GET_STORIES,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
}

export function getStory(id) {
  const request = axios.get(`${BaseURL}/story/${id}`);
  // eslint-disable-next-line no-unused-vars
  return (dispatch) =>
    request
      .then((res) => {
        console.log("getstory=", res);
        dispatch({ type: GET_STORY, payload: res.data });
      })
      .catch((err) => console.log(err));
}
export function addLike(blogId, userId) {
  console.log("helloo=", blogId, userId);
  const request = axios.get(`${BaseURL}/story/addlike/${blogId}/${userId}`);
  return (dispatch) =>
    request
      .then((res) => {
        console.log("Ok=", res.data);
        dispatch(
          fuseActions.showMessage({
            message: "like successful",
            variant: "success",
          })
        );
        dispatch({ type: ADD_LIKE, payload: res.data });
      })
      .catch((err) => console.log(err));
}
export function addFollow(userId, authId, storyId) {
  const request = axios.get(`${BaseURL}/follow/${userId}/${authId}`);
  return (dispatch) =>
    request
      .then((res) => {
        console.log("fooolooesaok=", res.data);
        dispatch(
          fuseActions.showMessage({
            message: "follow successful",
            variant: "success",
          })
        );
        dispatch(getStory(storyId));
      })
      .catch((err) => console.log(err));
}
export const getFilterCategory = (data) => {
  const request = axios.post(`${BaseURL}/getfiltercategories`, {
    categories: data,
  });
  return (dispatch) =>
    request
      .then((data) => {
        dispatch({
          type: GET_FILTER_CATEGORIES,
          payload: data.data,
        });
      })
      .catch((err) => console.log(err));
};
