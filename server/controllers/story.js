import Post from "../models/post.js";
import user from "../models/user.js";

export const getStories = (req, res) => {
  Post.find()
    .populate("userID", "avatar")
    .then((story) => {
      console.log("res==", story);
      res.json(story);
    })
    .catch((err) => console.log(err));
};
export const getStory = async (req, res) => {
  try {
    const result = await Post.findById(req.params.id)
      .populate({
        path: "userID",
        model: "User",
        populate: { path: "blogs", model: "Post" },
      })
      .populate({
        path: "comment",
        model: "Comment",
        populate: {
          path: "user",
          model: "User",
        },
      })
      .populate("categories")
      .exec();
    //  .then((story) => {
    //    console.log("idStory=", story);
    res.json(result);
    //  })
    //  .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
export const addLike = (req, res) => {
  Post.findByIdAndUpdate(
    req.params.blogid,
    { $addToSet: { likes: req.params.userid } },
    { safe: true, upsert: true, new: true }
  )
    .populate("userID")
    .populate({
      path: "comment",
      model: "Comment",
      populate: { path: "user", model: "User" },
    })
    .populate("categories")
    .then((data) => {
      console.log("likes==", data);
      res.json(data);
    })
    .catch((err) => console.log(err));
};

export const addFollow = (req, res) => {
  user
    .findByIdAndUpdate(
      req.params.userid,
      { $addToSet: { follows: req.params.authid } },
      { safe: true, upsert: true, new: true }
    )
    .then((data) => res.json("success"))
    .catch((err) => console.log(err));
};
export const getFilterStory = async (req, res) => {
  console.log("filter=", req.body.categories);
  await Post.find({ categories: { $all: req.body.categories } })
    .populate("userID", "avatar")
    .then((data) => {
      console.log("==========", data);
      res.json(data);
    })
    .catch((err) => console.log(err));
};
