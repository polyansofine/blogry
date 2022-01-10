import axios from "axios";
import { BaseURL } from "config/apiConfig";
import * as fuseActions from "../../../../store/actions";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";
export function submitRegister(userData, histroy) {
  const request = axios.post(`${BaseURL}/register`, userData);
  return (dispatch) =>
    request
      .then((data) => {
        console.log("data=", data);
        if (data.status === 200) {
          dispatch(
            fuseActions.showMessage({
              message: "Register Success",
              variant: "success",
              anchorOrigin: {
                vertical: "bottom", //top bottom
                horizontal: "right", //left center right
              },
            })
          );
          histroy.push("/login");
          return dispatch({
            type: REGISTER_SUCCESS,
            payload: data,
          });
        }
      })
      .catch((err) => {
        return dispatch({
          type: REGISTER_ERROR,
          payload: err,
        });
      });
}
