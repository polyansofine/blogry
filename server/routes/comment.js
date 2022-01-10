import express from "express";
import { addComment } from "../controllers/comment";
// import { imageUpload } from "../middleware/imageUpload";

const router = express.Router();
router.post("/api/comment/addcomment", addComment);
export default router;
