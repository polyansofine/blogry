import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import PostAddIcon from "@material-ui/icons/PostAdd";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Favorite from "@material-ui/icons/Favorite";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";

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

import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";
// import profileImg from "assets/img/faces/christian.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { useDispatch } from "react-redux";
import ParticlesBg from "particles-bg";
import {
  faFacebook,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import * as profileActions from "../store/actions";
import { BaseImgURL } from "config/apiConfig";

const useStyles = makeStyles(styles);
function OtherProfile(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    dispatch(profileActions.getProfile(props.match.params));
    // eslint-disable-next-line react/prop-types
  }, [props.match.params]);
  const profile = useSelector(({ profile }) => profile.profile.profile);
  //   const profile = useSelector(({ profile }) => profile);
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  //   const username = useSelector(({ auth }) => auth.login.username);
  //   const userAvatar = useSelector(({ auth }) => auth.login.avatar);
  //   const email = useSelector(({ auth }) => auth.login.email);
  // const [avatarUrl, setAvatarUrl] = useState(profile);
  // const [avatarStatus, setAvatarStatus] = useState(false);
  // const [avatar, setAvatar] = useState(false);

  //   const handleAvatar = async (e) => {
  //     // setAvatarUrl(URL.createObjectURL(e.target.files[0]));
  //     await dispatch(profileActions.updateAvatar(e.target.files[0]));
  //     // setAvatar(e.target.files[0]);
  //     // setAvatarStatus(true);
  //     // new Promise((resolve, reject) => {
  //     //   const body = new FormData();
  //     //   console.log("file=", e.target.files[0]);
  //     //   const token = sessionStorage.getItem("jwt");
  //     //   console.log("token=", token.slice(1, -1));
  //     //   body.append("files", e.target.files[0]);
  //     //   // let headers = new Headers();
  //     //   // headers.append("Origin", "http://localhost:3000");
  //     //   fetch(`${BaseURL}/${UPLOAD_AVATAR_ENDPOINT}`, {
  //     //     method: "post",
  //     //     headers: {
  //     //       Accept: "application/json",
  //     //       // eslint-disable-next-line prettier/prettier
  //     //       Authorization: `Bearer ${token.slice(1, -1)}` ,
  //     //     },
  //     //     body: body,
  //     //     // mode: "no-cors"
  //     //   })
  //     //     .then((res) => res.json())
  //     //     .then((res) => {
  //     //       console.log("res=======", res);
  //     //       resolve({});
  //     //     })
  //     //     .catch((err) => {
  //     //       reject(err);
  //     //     });
  //     // });
  //   };

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
        {profile && (
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div>
                      <label htmlFor="image">
                        {/* <input
                        type="file"
                        name="image"
                        id="image"
                        // eslint-disable-next-line no-undef
                        onChange={(e) => handleAvatar(e)}
                        style={{ display: "none" }}
                      /> */}
                        <img
                          src={`${BaseImgURL}/${profile.avatar}`}
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
                      <br />
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
                      {/* <div>
                        <h6>{profile.email}</h6>
                      </div> */}
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              <div className={classes.description}>
                <p>
                  An artist of considerable range, Chet Faker — the name taken
                  by Melbourne-raised
                </p>
              </div>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                  <NavPills
                    alignCenter
                    color="primary"
                    tabs={[
                      {
                        tabButton: "Post",
                        tabIcon: PostAddIcon,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={studio1}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={studio2}
                                className={navImageClasses}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={studio5}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={studio4}
                                className={navImageClasses}
                              />
                            </GridItem>
                          </GridContainer>
                        ),
                      },
                      {
                        tabButton: "Like",
                        tabIcon: ThumbUpAltIcon,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={work1}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={work2}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={work3}
                                className={navImageClasses}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={work4}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={work5}
                                className={navImageClasses}
                              />
                            </GridItem>
                          </GridContainer>
                        ),
                      },
                      {
                        tabButton: "Follow",
                        tabIcon: Favorite,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={work4}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={studio3}
                                className={navImageClasses}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={work2}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={work1}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={studio1}
                                className={navImageClasses}
                              />
                            </GridItem>
                          </GridContainer>
                        ),
                      },
                    ]}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
export default withRouter(OtherProfile);
