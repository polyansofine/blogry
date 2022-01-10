import axios from "axios";
import { BaseURL } from "config/apiConfig";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGN_OUT = "SIGN_OUT";
export const SET_USER = "SET_USER";
export const GET_USER = "GET_USER";
export function submitLogin(userData, histroy) {
  const request = axios.post(`${BaseURL}/auth/signin`, userData);
  return (dispatch) =>
    request
      .then((data) => {
        if (!data.data.error) {
          if (typeof window !== "undefined") console.log("data=", data.data);
          sessionStorage.setItem("jwt", JSON.stringify(data.data.token));
          histroy.push("/profile-page");
          return dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
          });
        } else {
          return dispatch({
            type: LOGIN_ERROR,
            payload: data.data.error,
          });
        }
      })
      .catch((err) => {
        console.log("err=", err);
        return dispatch({
          type: LOGIN_ERROR,
          payload: err,
        });
      });
}

export function signOut(history) {
  const request = axios.get(`${BaseURL}/auth/signout`);
  if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
  // cb();
  return (dispatch) =>
    request
      .then((res) => {
        console.log(res);
        document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        history.push("/");
        dispatch({
          type: SIGN_OUT,
        });
      })
      .catch((err) => console.log(err));
}

export function setUser(data) {
  return (dispatch) =>
    dispatch({
      type: SET_USER,
      payload: data,
    });
}

export function getUser(id) {
  console.log("id===", id);
  const request = axios.post(`${BaseURL}/auth/getUser`, { id: id });
  return (dispatch) =>
    request
      .then((res) => {
        console.log("resgetuer===", res);
        dispatch(setUser(res.data));
        // dispatch({
        //   type: GET_USER,
        //   payload: res,
        // });
      })
      .catch((err) => console.log(err));
}
