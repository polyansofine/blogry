import express from "express";
import {
  getUser,
  requireSignin,
  signin,
  signout,
  uploadAvatar,
} from "../controllers/auth";

const router = express.Router();

router.route("/api/auth/signin").post(signin);

router.route("/api/auth/signout").get(signout);
router.post("/api/upload_avatar", requireSignin, uploadAvatar);
router.post("/api/auth/getUser", getUser);

export default router;
