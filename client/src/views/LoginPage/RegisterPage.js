import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/register.jpg";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as authActions from "./store/actions";
import { useHistory } from "react-router";

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPass] = React.useState("");
  const [password1, setPass1] = React.useState("");
  const [error, setError] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPass(e.target.value);
    if (password.length < 5) {
      setError(true);
    } else {
      setError(false);
    }
  };
  const handleChangeConfirmPassword = (e) => {
    setPass1(e.target.value);
    //     if (password !== password1) {
    //       setError(true);
    //     } else {
    //       setError(false);
    //     }
  };

  const handleRegisterSubmit = () => {
    const userData = {
      name,
      email,
      password,
    };
    dispatch(authActions.submitRegister(userData, history));
  };
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Blogry"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4>Sign Up</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <TwitterIcon />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <FacebookIcon />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        {/* <i className={"fab fa-google-plus-g"} /> */}
                        <GitHubIcon />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  <CardBody>
                    <CustomInput
                      labelText="Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={name}
                      inputProps={{
                        onChange: handleChangeName,
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Email..."
                      id="regiEmail"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={email}
                      inputProps={{
                        onChange: handleChangeEmail,
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="regiPass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={password}
                      inputProps={{
                        onChange: handleChangePassword,
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <CustomInput
                      labelText="Confirm Password"
                      id="confirmPass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={password1}
                      inputProps={{
                        onChange: handleChangeConfirmPassword,
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    {error && (
                      <Typography color="error">
                        Wrong Password. Try agian.
                      </Typography>
                    )}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      disabled={error}
                      simple
                      color="primary"
                      size="lg"
                      onClick={handleRegisterSubmit}
                    >
                      Get started
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
