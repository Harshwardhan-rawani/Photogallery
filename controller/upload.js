const model = require("../model/user.js")
const jwt = require("jsonwebtoken")
const fs =  require("fs")
const uploads = async(req,res)=>{
    const image = req.file.path

 try {
    const token = req.header( "Authorization").replace("Bearer ","")
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    const del = await model.findOne({_id : decoded.user_id})
    fs.unlink(del.image, (err) => {
      if (err) {
        console.error('Failed to delete image file:');
      } else {
        console.log('Image file deleted successfully');
      }
    });
    const data = await model.findOneAndUpdate({_id : decoded.user_id},{$set : {image : image}},{new:true})
    res.status(200).json({message : "Image uploaded",image:data.image})
 } catch (error) {
    res.status(200).json({message : "Not uploaded"})
 }
}
module.exports = {uploads}