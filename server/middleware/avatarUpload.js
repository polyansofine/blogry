const multer = require("multer");
const path = require("path");
const uuid = require("uuid").v4;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("hello Avatar");
    cb(null, "./public/avatar");
  },
  filename: function (req, file, cb) {
    console.log("avatar===", file);
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
});
