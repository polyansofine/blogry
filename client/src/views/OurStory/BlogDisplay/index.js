import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Avatar, Typography } from "@material-ui/core";
import {
  Body1,
  Body2,
  Button,
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardMedia,
  // H6,
  IconButton,
  Spacer,
  Subtitle2,
  // Spacer,
  // Subtitle2,
} from "ui-neumorphism";
import Icon from "@mdi/react";
import { mdiShareVariant, mdiHeart } from "@mdi/js";
import "ui-neumorphism/dist/index.css";
import bg from "assets/img/bg3.jpg";
import { BaseImgURL } from "config/apiConfig";
import { NeuToggle } from "neumorphism-react";
import { useHistory } from "react-router";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import * as storyActions from "views/OurStory/store/actions";
import * as categoryActions from "views/AdminView/store/actions";
// import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import MasonryItem from "@mui/lab/MasonryItem";

// import { BaseImgURL } from "config/apiConfig";

// const img = require.context("assets/img", true);
export default function BlogDisplay() {
  const dispatch = useDispatch();
  const story = useSelector(({ stories }) => stories.stories.stories);
  const categories_list = useSelector(({ admin }) => admin.category.category);
  const [cardColor, setCardColor] = useState(false);
  const [status, setStatus] = useState(false);
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  useEffect(() => {
    dispatch(categoryActions.getCategories());
  }, []);

  const handleClick = (item) => {
    console.log("item=", item);
    history.push(`/ourstory/${item._id}`);
  };

  const handleFilterSearch = () => {
    const tempCategory = [];
    categories.map((item) => {
      tempCategory.push(item._id);
    });
    if (tempCategory.length > 0) {
      dispatch(storyActions.getFilterCategory(tempCategory));
    } else {
      dispatch(storyActions.getStories());
    }
  };

  const handleFilter = (e, val) => {
    console.log("vallue==", val);
    setCategories(val);
  };
  return (
    <div style={{ padding: "10px 30px" }}>
      {/* <Container> */}
      <Grid container justify="flex-end" alignItems="center" spacing={4}>
        <Grid md={status ? 6 : 2} item>
          <Autocomplete
            onFocus={() => setStatus(true)}
            multiple
            id="tags-outlined"
            onChange={handleFilter}
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
        <Grid item>
          <IconButton rounded text={false} onClick={handleFilterSearch}>
            <img src="https://img.icons8.com/material-outlined/24/000000/search--v1.png" />
          </IconButton>{" "}
        </Grid>
        <Grid item>
          <TextField />
        </Grid>
        <Grid item>
          <NeuToggle
            color="#e4ebf5"
            distance={3}
            size="small"
            onChange={() => setCardColor(!cardColor)}
          ></NeuToggle>
        </Grid>
      </Grid>
      <Masonry column={4} spacing={3} sx={{ overflow: "unset" }}>
        {/* <Grid container justify="space-around" spacing={4}> */}
        {story &&
          // eslint-disable-next-line no-unused-vars
          story.map(
            // eslint-disable-next-line no-unused-vars
            (item, index) => (
              <MasonryItem
                key={index}
                columnSpan={Math.floor(Math.random() * 0.5 + 0.5)}
              >
                <Card
                  dark={cardColor}
                  style={{ width: "100%", paddingBottom: "10px" }}
                  elevation={5}
                  rounded
                >
                  <CardHeader
                    title={
                      <Body1 style={{ marginTop: "20px", marginBottom: "0px" }}>
                        {item.userEmail.substr(0, 5)}...
                      </Body1>
                    }
                    subtitle={
                      <Subtitle2 secondary>
                        <Typography variant="caption">
                          {item.postContent.substr(4, 12)}...
                        </Typography>
                      </Subtitle2>
                    }
                    avatar={
                      <Avatar
                        onClick={() => {
                          console.log("click");
                          history.push(`/profile-page/${item.userID._id}`);
                        }}
                        size="medium"
                        style={{ cursor: "pointer", marginTop: "10px" }}
                        src={`${BaseImgURL}/${item.userID.avatar}`}
                      ></Avatar>
                    }
                  />
                  <CardMedia
                    // style={{
                    //   height: 0,
                    //   paddingTop: "56.25%", // 16:9,
                    //   marginTop: "30",
                    // }}
                    rounded
                    style={{ minHeight: "200" }}
                    height={Math.floor(Math.random() * 2 + 1) * 100}
                    dark
                    src={item.image[0] ? `${BaseImgURL}/${item.image[0]}` : bg}
                  ></CardMedia>
                  <CardContent rounded>
                    <Body2>
                      {item.postContent.split("</h1>")[1].substr(3, 12)}....
                    </Body2>
                  </CardContent>
                  <CardAction>
                    <Grid container justify="space-around" alignItems="center">
                      <Button
                        text
                        color="var(--primary)"
                        onClick={() => handleClick(item)}
                      >
                        Read
                      </Button>
                      <div>
                        <IconButton text={false} rounded>
                          <Icon path={mdiHeart} size={1}></Icon>
                        </IconButton>
                        <IconButton rounded text={false}>
                          <Icon path={mdiShareVariant} size={1}></Icon>
                        </IconButton>
                      </div>
                    </Grid>
                  </CardAction>
                  <Spacer />
                </Card>
              </MasonryItem>
            )
          )}
      </Masonry>
      {/* </Grid> */}
      {/* </Container> */}

      {/* <Button animation> Hello</Button> */}
    </div>
  );
}
