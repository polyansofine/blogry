import express from "express";
import cookieParser from "cookie-parser";
import config from "./config";
import cors from "cors";

// ADD these
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import postRoutes from "./routes/post";
import storyRoutes from "./routes/story";
import commentRoutes from "./routes/comment";
//---------------start adminRoute ---------------------------------------------------------//
import categoryRoutes from "./routes/admin/category";
//---------------end admin ---------------------------------------------------------//
const imageMiddleware = require("./middleware/imageUpload");
// const avatarMiddleware = require("./middleware/avatarUpload");
import path from "path";
// DB connection
require("./config/dbConnection");
require("babel-core/register");
require("babel-polyfill");
const app = express();
// app.use(multer({ dest: "/upload" }));
// middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/", express.static(path.join(__dirname, "/public")));
console.log("dir==", __dirname);
app.use(imageMiddleware.single("files"));
// app.use(avatarMiddleware.single("avatar"));
// ADD routes
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", postRoutes);
app.use("/", storyRoutes);
app.use("/", commentRoutes);
app.use("/", categoryRoutes);
// ----------------------------production part start------------------------//
// Serve any static files
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
// ----------------------------production part end------------------------//

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ":" + err.message });
  }
});

app.listen(config.port, () => {
  console.log(`🚀 at port ${config.port}`);
});
