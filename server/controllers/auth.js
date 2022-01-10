import User from "../models/user.js";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "../config/index.js";

export const signin = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      return res.json({
        error: { username: "User not found" },
      });
    }
    if (!user.authenticate(req.body.password)) {
      return res.json({
        error: { password: "Wrong Password!" },
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      config.jwtSecret
    );

    res.cookie("t", token, {
      expire: new Date() + 9999,
    });
    const { _id, name, email, avatar } = user;
    return res.json({
      token,
      user: { _id, name, email, avatar },
    });
  });
};

export const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Sign out successful!",
  });
};

export const requireSignin = expressJwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
});

export const hasAuthorization = (req, res) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized!",
    });
  }
};
export const uploadAvatar = (req, res, next) => {
  console.log("reqfile=", req.file);
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.file.filename },
    { new: true }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
  // const newImage = new Post({ image: req.file.path });
  // newImage
  // .save()
  // if (req.file) {
  //   res.json(req.file);
  // } else {
  //   null;
  // }
};

export const getUser = (req, res) => {
  console.log("severId==", req.body);
  User.findById(req.body.id)
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
};

// exports.requireLogin = expressJwt({
//   secret: process.env.JWT_TOKEN_SECRET,
//   algorithms: ["HS256"],
// });
