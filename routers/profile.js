const express =require("express")
const routes=express.Router()
const path = require("path")
const {getProfile} = require("../controller/profile")
const multer = require("multer")
const {uploads} = require("../controller/upload")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/profiles'); 
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);

    }
  });
  const upload = multer({ storage: storage });
routes.get("/",getProfile)
routes.put("/uploads",upload.single("image"),uploads)

module.exports = routes