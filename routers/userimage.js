const express =require("express")
const routes=express.Router()
const path = require("path")
const multer = require("multer")
const {Postuserimage, getuserimage,deleteuser} = require("../controller/userimage")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/userimage'); 
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);

    }
  });
  const upload = multer({ storage: storage });
  routes.post("/uploadphoto",upload.single("image"),Postuserimage)
  routes.get("/getimage",getuserimage)
  routes.delete("/photo/:id",deleteuser)
module.exports = routes