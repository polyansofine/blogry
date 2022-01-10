import express from "express";
import {
  registerUser,
  findUserById,
  findUserProfile,
  deleteUser,
  getProfile,
} from "../controllers/user";

import { requireSignin, hasAuthorization } from "../controllers/auth";

const router = express.Router();

router.get("/api/profile/:userID", getProfile);
router.route("/api/register").post(registerUser);

router
  .route("/api/users/:userId")
  .get(requireSignin, findUserProfile)
  .delete(requireSignin, hasAuthorization, deleteUser);

router.param("userId", findUserById);

export default router;
