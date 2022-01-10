import express from "express";
import { getStories, getStory, addLike, addFollow } from "../controllers/story";
// import { imageUpload } from "../middleware/imageUpload";

const router = express.Router();
router.get("/api/story/getstories", getStories);
router.get("/api/story/:id", getStory);
router.get("/api/story/addlike/:blogid/:userid", addLike);
router.get("/api/follow/:userid/:authid", addFollow);
export default router;
