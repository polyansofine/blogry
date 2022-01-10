/* eslint-disable react/prop-types */
import { Chip, Grid, IconButton, Paper, Typography } from "@material-ui/core";
import { EditSharp } from "@material-ui/icons";
import { BaseImgURL } from "config/apiConfig";
import React from "react";
import { useHistory } from "react-router";

export default function Mention(props) {
  // eslint-disable-next-line react/prop-types
  const { blogs } = props;
  const history = useHistory();
  return (
    <div>
      {blogs?.map((item, index) => (
        <Paper
          key={index}
          elevation={3}
          style={{
            margin: "4px",
            backgroundColor: "whitesmoke",
            padding: "10px",
          }}
        >
          <Grid container>
            <Grid item md={2}>
              <img
                style={{ borderRadius: "10px" }}
                src={`${BaseImgURL}/${item.image[0]}`}
                width="100px"
                height="100px"
              />
            </Grid>
            <Grid
              item
              md={10}
              container
              direction="column"
              justify="flex-start"
            >
              <div>
                <Typography variant="subtitle1" style={{ float: "left" }}>
                  {item.postContent.split("<h1>" && "</h1>")[0].substr(4)}
                </Typography>
                <div style={{ float: "right" }}>
                  <img src="https://img.icons8.com/ios/18/000000/facebook-like--v1.png" />
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginLeft: "6px",
                      marginRight: "20px",
                    }}
                  >
                    {item.likes?.length}
                  </span>
                  <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/18/000000/external-comment-chat-flatart-icons-outline-flatarticons-2.png" />
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginLeft: "6px",
                      marginRight: "20px",
                    }}
                  >
                    {item.comment?.length}
                  </span>
                  {/* <img src="https://img.icons8.com/external-prettycons-lineal-prettycons/18/000000/external-favorite-essentials-prettycons-lineal-prettycons.png" /> */}
                </div>
              </div>
              <br />

              <Typography variant="body1">
                {item.postContent.split("<h1>" && "</h1>")[1].substr(4, 50)}...
              </Typography>
              <Grid container justify="space-between" alignItems="center">
                <div>
                  {item.categories?.map((iitem, index) => (
                    <Chip size="small" label={iitem.name} key={index} />
                  ))}
                </div>
                <div>
                  <IconButton
                    style={{ marginRight: "20px" }}
                    onClick={() =>
                      history.push("/post", {
                        data: item.postContent,
                        id: item._id,
                      })
                    }
                  >
                    <EditSharp />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
}
