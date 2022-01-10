import express from "express";
import { addCategory, getCategories } from "../../controllers/admin/category";
import { getFilterStory } from "../../controllers/story";
// import { imageUpload } from "../middleware/imageUpload";

const router = express.Router();
router.post("/api/addcategory", addCategory);
router.get("/api/getcategories", getCategories);
router.post("/api/getfiltercategories", getFilterStory);
export default router;
