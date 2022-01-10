import { Avatar, Button, Grid, Card, CardActions } from "@material-ui/core";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import { BaseImgURL } from "config/apiConfig";
import * as commentActions from "../store/actions";
// import { typeOf } from "neumorphism-react";

// import EditorJs from "react-editor-js";
// import { EDITOR_JS_TOOLS } from "./constants";

export default function CommentSide() {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth.login);
  const storyId = useSelector(({ stories }) => stories.stories.story._id);
  const comments = useSelector(({ stories }) => stories.stories.story.comment);
  const [comment, setComment] = useState();
  // const [comments, setComments] = useState();
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const handleChange = (content) => {
    setComment(content);
  };
  const handleSend = () => {
    dispatch(commentActions.addComment(auth.id, storyId, comment));
  };
  return (
    <div style={{ width: "500px", padding: "20px" }}>
      <div>
        {comments.length > 0 &&
          comments.map((item, index) => (
            <Card key={index} elevation={2} style={{ margin: "10px" }}>
              <Grid container justify="space-between">
                <Grid item md={2} style={{ padding: "15px" }}>
                  <Avatar src={`${BaseImgURL}/${item.user.avatar}`}></Avatar>
                </Grid>
                <Grid item md={10}>
                  <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  >
                    {/* <ReactQuill
                value={comments}
                readOnly="true"
                theme="snow"
              ></ReactQuill> */}
                  </div>
                </Grid>
              </Grid>
              <CardActions>
                <Grid container justify="flex-end" spacing={4}>
                  <Grid item>
                    <img src="https://img.icons8.com/ios/20/000000/applause.png" />
                    <span> 23</span>
                  </Grid>
                  <Grid item>2021-8-23</Grid>
                  <Grid item> ivan</Grid>
                </Grid>
              </CardActions>
            </Card>
          ))}
      </div>
      <ReactQuill
        theme="snow"
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
      <Button
        disabled={auth.id ? false : true}
        onClick={handleSend}
        style={{ float: "right", marginTop: "10px" }}
        variant="contained"
      >
        Send
      </Button>
    </div>
  );
}
