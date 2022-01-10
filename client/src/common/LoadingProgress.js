import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    position: "fixed",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100000000,
  },
}));

export default function LoadingProgress() {
  const status = useSelector(({ fuse }) => fuse.loading.state);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {status ? <CircularProgress color="secondary" /> : null}
    </div>
  );
}
