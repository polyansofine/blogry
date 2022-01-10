/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CreateIcon from "@material-ui/icons/Create"; // @material-ui/core components
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../views/LoginPage/store/actions";
import * as fuseActions from "store/actions/fuse";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { Avatar } from "@material-ui/core";
import auth from "common/auth-helper";
import { BaseImgURL } from "config/apiConfig";
import * as storyActions from "../../views/OurStory/store/actions";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const authStatus = useSelector(({ auth }) => auth.login.isAuthenticated);
  const auth = useSelector(({ auth }) => auth.login);

  const handleLogin = () => {
    history.push("/login");
  };
  const handleRegister = () => {
    history.push("/register");
  };
  const handlePost = () => {
    if (authStatus) {
      history.push("/post");
    } else {
      console.log("false");
      dispatch(
        fuseActions.showMessage({
          message: "You have to sign in",
          variant: "warning",
        })
      );
    }
  };

  const handleStory = () => {
    history.push("/ourstory");
  };

  const handleMenuClick = (e) => {
    switch (e) {
      case `${auth.email}`:
        history.push("/profile-page");
        break;

      default:
        break;
    }
  };
  const handleSignOut = () => {
    dispatch(authActions.signOut(history));
  };
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {/* <CustomDropdown
      noLiPadding
      buttonText="Components"
      buttonProps={{
        className: classes.navLink,
        color: "transparent",
      }}
      buttonIcon={Apps}
      dropdownList={[
        <Link to="/" className={classes.dropdownLink}>
          All components
        </Link>,
        <a
          href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
          target="_blank"
          className={classes.dropdownLink}
        >
          Documentation
        </a>,
      ]}
    /> */}
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button color="transparent" onClick={handleStory}>
            <LocalLibraryIcon />
            About Us
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          // target="_blank"
          className={classes.navLink}
        >
          <AssignmentIndIcon /> Policies
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          // target="_blank"
          className={classes.navLink}
        >
          <AssignmentIndIcon /> Term and Conditions
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            // href="https://twitter.com/CreativeTim?ref=creativetim"
            // target="_blank"
            color="transparent"
            onClick={handlePost}
            className={classes.navLink}
          >
            <CreateIcon />
            Write
            {/* <i className={classes.socialIcons + " fab fa-twitter"} /> */}
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        {authStatus ? (
          <Tooltip
            id="instagram-tooltip"
            title="Follow us on instagram"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
          >
            <Button color="transparent" onClick={handleSignOut}>
              <ExitToAppIcon /> Sign Out
            </Button>
          </Tooltip>
        ) : (
          <Tooltip
            id="instagram-facebook"
            title="Follow us on facebook"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
          >
            <Button
              color="transparent"
              onClick={handleRegister}
              // href="https://www.facebook.com/CreativeTim?ref=creativetim"
              // target="_blank"
              className={classes.navLink}
            >
              {/* <i className={classes.socialIcons + " fab fa-facebook"} /> */}
              <LockOpenIcon />
              Sign Up
            </Button>
          </Tooltip>
        )}
      </ListItem>

      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          {authStatus ? (
            <>
              <div>
                <CustomDropdown
                  id="userAvatarDropdown"
                  buttonProps={{
                    round: true,
                    color: "transparent",
                  }}
                  dropdownList={[
                    `${auth.email}`,
                    { divider: true },
                    "Another action",
                    "Something else here",
                    { divider: true },
                    "Separated link",
                    { divider: true },
                    "One more separated link",
                  ]}
                  onClick={(e) => handleMenuClick(e)}
                  buttonText={
                    <Avatar
                      sizes="large"
                      src={
                        auth.avatar
                          ? `${BaseImgURL}/${auth.avatar}`
                          : require("assets/img/faces/christian.jpg").default
                      }
                    ></Avatar>
                  }
                ></CustomDropdown>
              </div>
            </>
          ) : (
            <Button
              color="success"
              onClick={handleLogin}
              // href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
              // target="_blank"
              className={classes.navLink}
            >
              {/* <i className={classes.socialIcons + " fab fa-instagram"} /> */}
              Get Started
            </Button>
          )}
        </Tooltip>
      </ListItem>
    </List>
  );
}
