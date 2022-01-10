/* eslint-disable no-unused-vars */
import axios from "axios";
import { BaseURL } from "config/apiConfig";
import * as fuseActions from "store/actions/fuse";

export const ADD_POST = "ADD_POST";

export function addPost(data, user, id, categories, editId) {
  const request = axios.post(`${BaseURL}/post/addpost`, {
    data,
    user,
    id,
    categories,
    editId,
  });
  return (dispatch) =>
    request
      .then((res) => {
        dispatch(
          fuseActions.showMessage({
            message: "Post success",
            variant: "success",
          })
        );
        console.log("responseData====", res);
        dispatch({
          type: ADD_POST,
          payload: res,
        });
      })
      .catch((err) => console.log(err));
}
