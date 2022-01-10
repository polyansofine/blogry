export const UPDATE_AVATAR = "UPDATE_AVATAR";
export const GET_PROFILE = "GET_PROFILE";
import { BaseURL } from "config/apiConfig";
import axios from "axios";

const UPLOAD_AVATAR_ENDPOINT = "upload_avatar";

export function updateAvatar(data) {
  const body = new FormData();
  console.log("file=", data);
  const token = sessionStorage.getItem("jwt");
  console.log("token=", token.slice(1, -1));
  body.append("files", data);
  return async (dispatch) => {
    await fetch(`${BaseURL}/${UPLOAD_AVATAR_ENDPOINT}`, {
      method: "post",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token.slice(1, -1)}`,
      },
      body: body,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res=======", res);

        dispatch({
          type: UPDATE_AVATAR,
          payload: res,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getProfile(id) {
  console.log("profileid=", id);
  const request = axios.get(`${BaseURL}/profile/${id.id}`);
  // eslint-disable-next-line no-unused-vars
  return (dispatch) => {
    request
      .then((res) => {
        console.log("resprofile=", res);
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
}
