import express from "express";
import { addPost, uploadFiles } from "../controllers/post";
// import { imageUpload } from "../middleware/imageUpload";

const router = express.Router();

router.post("/api/upload_files", uploadFiles);
router.post("/api/post/addpost", addPost);

export default router;
