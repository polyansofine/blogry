import Comment from "../models/comment.js";
import Post from "../models/post.js";
export const addComment = (req, res) => {
  console.log("reqcomment===", req.body);
  const newComment = new Comment({
    user: req.body.authId,
    blog: req.body.storyId,
    body: req.body.data,
  });
  newComment
    .save()
    .then((comment) => {
      Post.findByIdAndUpdate(
        req.body.storyId,
        {
          $push: { comment: comment._id },
        },
        { safe: true, upsert: true, new: true }
      )
        .then((stroy) => res.json(stroy))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
