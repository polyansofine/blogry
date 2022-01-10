/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// import GridContainer from "components/Grid/GridContainer";
// import GridItem from "components/Grid/GridItem";
import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import Button from "components/CustomButtons/Button";
import Parallax from "components/Parallax/Parallax";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import classNames from "classnames";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BaseURL } from "config/apiConfig";
import { BaseImgURL } from "config/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as postActions from "./store/actions";
import * as categoryActions from "views/AdminView/store/actions";
import "./write.css";
import * as fuseActions from "../../store/actions";
// import BalloonEditor from "@ckeditor/ckeditor5-build-balloon-block";
// import Context from "@ckeditor/ckeditor5-core/src/context";
// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

// const dashboardRoutes = [];
const useStyles = makeStyles(styles);
const UPLOAD_ENDPOINT = "upload_files";
export default function Write(props) {
  const { ...rest } = props;
  console.log("props==", props);

  const [editData, setEditData] = useState(
    props.history.location.state ? props.history.location.state.data : ""
  );
  const [editId, setEditId] = useState(
    props.history.location.state ? props.history.location.state.id : ""
  );

  const [postData, setPostData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const pData = useSelector(({ post }) => post.post.post.data.postContent);
  const auth = useSelector(({ auth }) => auth.login.email);
  const id = useSelector(({ auth }) => auth.login.id);
  const categories_list = useSelector(({ admin }) => admin.category.category);

  useEffect(() => {
    dispatch(categoryActions.getCategories());
  }, []);

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          console.log("loader=", loader);
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            // let headers = new Headers();
            // headers.append("Origin", "http://localhost:3000");
            fetch(`${BaseURL}/${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body,
              // mode: "no-cors"
            })
              .then((res) => res.json())
              .then((res) => {
                console.log("res=======", res);
                resolve({
                  default: `${BaseImgURL}/${res.filename}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  function handleSubmit() {
    if (categories.length > 0) {
      const tempCategory = [];
      categories.map((item) => {
        tempCategory.push(item._id);
      });
      const data = {
        tempData: postData,
      };
      console.log("editid=", editId);
      console.log("data====", data);
      dispatch(postActions.addPost(data, auth, id, tempCategory, editId));
      setOpenModal(true);
    } else {
      dispatch(
        fuseActions.showMessage({
          message: "you should select Category",
          variant: "warning",
        })
      );
    }
  }

  function handleCategory(e, val) {
    console.log("category=", e, val);
    setCategories(val);
  }
  return (
    <div className="write-content">
      <Header
        color="transparent"
        //   routes={dashboardRoutes}
        brand="Blogry"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        smaller
        filter
        image={require("assets/img/bg8.jpg").default}
      ></Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Typography
            style={{ marginTop: "20px", marginBottom: "20px" }}
            variant="h3"
          >
            Post
          </Typography>
          <Grid container spacing={8}>
            <Grid item md={9}>
              <CKEditor
                editor={ClassicEditor}
                data={editData ? editData : "<p>Hello from CKEditor 5!</p>"}
                config={{
                  extraPlugins: [uploadPlugin],
                }}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setPostData(data);
                  console.log({ event, editor, data });
                }}
                // onBlur={(event, editor) => {
                //   console.log("Blur.", editor);
                // }}
                // onFocus={(event, editor) => {
                //   console.log("Focus.", editor);
                // }}
              ></CKEditor>
              <div>
                <Button
                  color="success"
                  style={{ float: "right" }}
                  round
                  onClick={handleSubmit}
                >
                  Publish
                </Button>
              </div>
            </Grid>
            <Grid item md={3}>
              <Autocomplete
                multiple
                id="tags-outlined"
                onChange={handleCategory}
                options={categories_list}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Category"
                    placeholder="Favorites"
                  />
                )}
              />
            </Grid>
          </Grid>

          {openModal && (
            <Grid container>
              <Grid item md={6}>
                <Paper>
                  <div
                    className="ck-content"
                    dangerouslySetInnerHTML={{ __html: pData }}
                  ></div>
                </Paper>
              </Grid>
              <Grid item md={6}></Grid>
            </Grid>
            //     </div>
            //   </Paper>
            // </div>
          )}
        </div>
      </div>
    </div>
  );
}
