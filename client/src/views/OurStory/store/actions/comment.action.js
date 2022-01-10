import axios from "axios";
import { BaseURL } from "config/apiConfig";
import * as fuseActions from "store/actions";
import * as Actions from "./index";
export const ADD_COMMENT = "ADD_COMMENT";

export function addComment(authId, storyId, data) {
  const request = axios.post(`${BaseURL}/comment/addcomment`, {
    storyId: storyId,
    authId: authId,
    data: data,
  });
  return (dispatch) =>
    request
      .then((res) => {
        console.log("comment=", res.data);
        dispatch(
          fuseActions.showMessage({
            message: "comment successful added",
            variant: "success",
          })
        );
        dispatch(Actions.getStory(storyId));
        //   dispatch(getStory(storyId));
      })
      .catch((err) => console.log(err));
}
