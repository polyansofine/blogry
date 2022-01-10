import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BlogDisplay from "./BlogDisplay";
import * as storyActions from "./store/actions";
// import "./story.css";

export default function OurStory() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(storyActions.getStories());
  });
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

      <div style={{ marginTop: "100px" }} />
      <BlogDisplay />
    </div>
  );
}
