import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import profileImg from "assets/img/faces/christian.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { useDispatch, useSelector } from "react-redux";
import ParticlesBg from "particles-bg";
import {
  faFacebook,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import * as profileActions from "./store/actions";
import { BaseImgURL } from "config/apiConfig";
import Mention from "./Mention";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const dispatch = useDispatch();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const id = useSelector(({ auth }) => auth.login.id);
  useEffect(() => {
    dispatch(profileActions.getProfile({ id: id }));
  }, [id]);
  // const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const profile = useSelector(({ profile }) => profile.profile.profile);
  // const email = useSelector(({ auth }) => auth.login.email);
  // const [avatarUrl, setAvatarUrl] = useState(profile);
  // const [avatarStatus, setAvatarStatus] = useState(false);
  // const [avatar, setAvatar] = useState(false);

  const handleAvatar = async (e) => {
    // setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    await dispatch(profileActions.updateAvatar(e.target.files[0]));
    // setAvatar(e.target.files[0]);
    // setAvatarStatus(true);
    // new Promise((resolve, reject) => {
    //   const body = new FormData();
    //   console.log("file=", e.target.files[0]);
    //   const token = sessionStorage.getItem("jwt");
    //   console.log("token=", token.slice(1, -1));
    //   body.append("files", e.target.files[0]);
    //   // let headers = new Headers();
    //   // headers.append("Origin", "http://localhost:3000");
    //   fetch(`${BaseURL}/${UPLOAD_AVATAR_ENDPOINT}`, {
    //     method: "post",
    //     headers: {
    //       Accept: "application/json",
    //       // eslint-disable-next-line prettier/prettier
    //       Authorization: `Bearer ${token.slice(1, -1)}` ,
    //     },
    //     body: body,
    //     // mode: "no-cors"
    //   })
    //     .then((res) => res.json())
    //     .then((res) => {
    //       console.log("res=======", res);
    //       resolve({});
    //     })
    //     .catch((err) => {
    //       reject(err);
    //     });
    // });
  };

  return (
    <div>
      <Header
        color="transparent"
        brand="Blogry"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        smaller
        filter
        image={require("assets/img/profile.jpg").default}
      >
        <ParticlesBg type="lines" />
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <label htmlFor="image">
                      <input
                        type="file"
                        name="image"
                        id="image"
                        // eslint-disable-next-line no-undef
                        onChange={(e) => handleAvatar(e)}
                        style={{ display: "none" }}
                      />
                      <img
                        src={
                          profile.avatar && profile.avatar.length > 1
                            ? `${BaseImgURL}/${profile.avatar}`
                            : profileImg
                        }
                        style={{ cursor: "pointer" }}
                        alt="..."
                        className={imageClasses}
                      />
                    </label>
                    {/* {avatarStatus && (
                      <Button onClick={submitAvatar}>Update Avatar</Button>
                    )} */}
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{profile.name}</h3>
                    <div>
                      <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                      >
                        <div>
                          <Typography variant="h4">
                            {profile.blogs?.length}
                          </Typography>
                          <Typography variant="caption">Posts</Typography>
                        </div>
                        <div>
                          <Typography variant="h4">
                            {profile.follows?.length}
                          </Typography>
                          <Typography variant="caption">Followers</Typography>
                        </div>
                        <div>
                          <Typography variant="h4"></Typography>
                          <Typography variant="caption">Followings</Typography>
                        </div>
                      </Grid>
                    </div>
                    <Button justIcon link className={classes.margin5}>
                      <FontAwesomeIcon color="#a617ad" icon={faGoogle} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      {/* <i className={"fab fa-instagram"} /> */}
                      <FontAwesomeIcon color="#a617ad" icon={faInstagram} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <FontAwesomeIcon color="#a617ad" icon={faFacebook} />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                An artist of considerable range, Chet Faker — the name taken by
                Melbourne-raised,
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Mention",
                      tabIcon: Camera,
                      tabContent: <Mention blogs={profile.blogs} />,
                    },
                    {
                      tabButton: "Work",
                      tabIcon: Palette,
                      tabContent: <div>Hello</div>,
                    },
                    {
                      tabButton: "Favorite",
                      tabIcon: Favorite,
                      tabContent: <div>Hello</div>,
                    },
                    {
                      tabButton: "Personal Info",
                      tabIcon: Favorite,
                      tabContent: <div>Hello</div>,
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
