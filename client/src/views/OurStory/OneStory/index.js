import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router";
// import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as storyActions from "../store/actions";
import HeaderLinks from "components/Header/HeaderLinks";
import Header from "components/Header/Header";
import { Avatar, Drawer, Grid } from "@material-ui/core";
import { NeuDiv } from "neumorphism-react";
import { Body1, Fab, Card, Chip, Typography } from "ui-neumorphism";
import { BaseImgURL } from "config/apiConfig";
import * as fuseActions from "store/actions";
import CommentSide from "../CommentSide";
// import CommentEditor from "components/CommentEditor";
// import CommentEditor from "components/CommentEditor";
// import Disqus from "disqus-react";

function OneStory(props) {
  const history = useHistory();
  // eslint-disable-next-line react/prop-types
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const [commentView, setCommentView] = useState(false);

  useEffect(() => {
    dispatch(storyActions.getStory(id));
  }, [id]);
  const story = useSelector(({ stories }) => stories.stories.story);

  // const likes = useSelector(({ stories }) => stories.stories.likes);
  const authId = useSelector(({ auth }) => auth.login.id);
  const handleLikes = () => {
    if (authId === "") {
      dispatch(
        fuseActions.showMessage({
          message: "you have to sign in",
          variant: "warning",
        })
      );
    } else {
      if (authId === story.userID._id) {
        dispatch(
          fuseActions.showMessage({
            message: "you can't like youself",
            variant: "warning",
          })
        );
      } else {
        dispatch(storyActions.addLike(story._id, authId));
      }
    }
  };

  const handleComment = () => {
    if (authId === "") {
      dispatch(
        fuseActions.showMessage({
          message: "you have to sign in",
          variant: "warning",
        })
      );
    } else {
      console.log("hello");
      setCommentView(true);
    }
  };

  const handleClose = () => {
    setCommentView(false);
  };

  const handleFollow = () => {
    dispatch(storyActions.addFollow(story.userID._id, authId, story._id));
  };
  return (
    <div>
      <Header
        color="primary"
        //   routes={dashboardRoutes}
        brand="Stories"
        positon="sticky"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
      />
      <div style={{ margin: "100px", positon: "relative" }}></div>
      <Grid container>
        <Grid item md={3}>
          <div
            style={{
              marginTop: "60px",
              marginRight: "30px",
              marginLeft: "30px",
            }}
          >
            <Card
              color="#e4ebf5"
              rounded
              elevation={3}
              style={{ padding: "20px" }}
            >
              <Grid container direction="column" alignItems="center">
                {story.userID && (
                  <div>
                    <Grid container alignItems="center" direction="column">
                      <Avatar
                        style={{ cursor: "pointer" }}
                        size={100}
                        src={`${BaseImgURL}/${story.userID.avatar}`}
                        onClick={() =>
                          history.push(`/profile-page/${story.userID._id}`)
                        }
                      ></Avatar>
                      <Body1>{story.userID.name}</Body1>
                    </Grid>
                  </div>
                )}
                {story.userID && (
                  <center>
                    <p>
                      <strong>{story.userID.follows.length}</strong>
                    </p>
                  </center>
                )}

                <center>
                  {story.userID && authId === story.userID._id ? (
                    <div></div>
                  ) : (
                    <Fab
                      className="follow-btn"
                      // width="150px"
                      // height="100px"
                      color="white"
                      disabled={
                        story.userID &&
                        story.userID.follows.find((id) => id === authId)
                      }
                      bgColor="#198f0e"
                      onClick={handleFollow}
                      // color="#e4ebf5"
                      style={{ padding: "20px" }}

                      // radius={10}
                    >
                      &nbsp;<span style={{ fontSize: "24px" }}>&#9825;</span>
                      &nbsp; Follow !
                    </Fab>
                  )}
                </center>
                <Grid container justify="space-around">
                  <Grid>
                    <Fab size="small" onClick={handleLikes}>
                      <img src="https://img.icons8.com/emoji/30/26e07f/nikita-clapping-hands-emoji.png" />
                    </Fab>
                    <br />
                    <center>
                      <p>
                        <strong>{story.likes && story.likes.length}</strong>
                      </p>
                    </center>
                  </Grid>
                  <Grid>
                    <Fab size="small" onClick={handleComment}>
                      <img src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/30/26e07f/external-texting-chat-flatart-icons-solid-flatarticons.png" />{" "}
                    </Fab>
                    <center>
                      <p>
                        <strong>
                          {story ? story.comment && story.comment.length : 0}
                        </strong>
                      </p>
                    </center>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
            <div style={{ margin: "20px" }}>
              <center>
                {story.categories?.map((item, index) => (
                  <Chip
                    key={index}
                    style={{
                      margin: "10px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                    type="success"
                  >
                    {item.name}
                  </Chip>
                ))}
              </center>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Card
                color="#e4ebf5"
                rounded
                elevation={3}
                style={{ padding: "20px" }}
              >
                <center>
                  <Typography>{story.userID?.name}s Posts</Typography>
                  {story.userID?.blogs.map((item, index) => (
                    <img
                      src={`${BaseImgURL}/${item.image[0]}`}
                      key={index}
                      width="80px"
                      height="80px"
                      style={{
                        borderRadius: "25px",
                        border: "1px solid #6e654d",
                        margin: "3px",
                      }}
                    />
                  ))}
                </center>
              </Card>
            </div>
          </div>
        </Grid>
        <Grid item md={8}>
          {story && (
            <NeuDiv color="#e4ebf5" revert style={{ padding: "20px" }}>
              <Grid container justify="center">
                <div
                  dangerouslySetInnerHTML={{ __html: story.postContent }}
                ></div>
              </Grid>
            </NeuDiv>
          )}
        </Grid>
        <Grid item md={1}>
          {/* <CommentEditor /> */}
        </Grid>
      </Grid>
      <Drawer open={commentView} onClose={handleClose} anchor="right">
        <CommentSide />
      </Drawer>
    </div>
  );
}
export default withRouter(OneStory);
