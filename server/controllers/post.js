import Post from "../models/post.js";
import User from "../models/user.js";
var tempImage = [];
export const uploadFiles = (req, res, next) => {
  console.log("reqfile=", req.file);
  // const newImage = new Post({ image: req.file.path });
  // newImage
  // .save()
  tempImage.push(req.file.filename);
  if (req.file) {
    res.json(req.file);
  } else {
    null;
  }
};

export const addPost = (req, res, next) => {
  console.log("postData", req.body.editId);
  if (req.body.editId !== "") {
    Post.findByIdAndUpdate(req.body.editId, {
      postContent: req.body.data.tempData,
      categories: req.body.categories,
    })
      .then((item) => console.log(item))
      .catch((err) => console.log(err));
  } else {
    const postData = new Post({
      postContent: req.body.data.tempData,
      userEmail: req.body.user,
      userID: req.body.id,
      image: tempImage,
      categories: req.body.categories,
    });
    tempImage = [];
    postData
      .save()
      .then((data) =>
        User.findByIdAndUpdate(
          req.body.id,
          { $push: { blogs: data._id } },
          { safe: true, upset: true, new: true }
        )
          .then((item) => res.json(data))
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  }
};
