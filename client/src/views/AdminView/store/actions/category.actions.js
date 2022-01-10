import axios from "axios";
import { BaseURL } from "config/apiConfig";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const GET_CATEGORIES = "GET_CATEGORIES";

export const addcategory = (val) => {
  const request = axios.post(`${BaseURL}/addcategory`, { category: val });

  return (dispatch) =>
    request
      .then((res) => {
        console.log("res===", res.data);
        dispatch({
          type: ADD_CATEGORY,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
};
export const getCategories = () => {
  const request = axios.get(`${BaseURL}/getcategories`);
  return (dispatch) =>
    request
      .then((data) => dispatch({ type: GET_CATEGORIES, payload: data.data }))
      .catch((err) => console.log(err));
};
