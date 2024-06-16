const model = require("../model/userimage")
const jwt = require("jsonwebtoken")
const fs =  require("fs")
const getuserimage=async(req,res)=>{
  try
  {
  const token = req.header( "Authorization").replace("Bearer ","")
  const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
  const data = await model.find({user_id:decoded.user_id})
  res.json(data)
  }
  catch(error) {
   console.log("error")
  }
  
}

const Postuserimage= async(req,res)=>{
  const {title}=req.body
  const image=req.file.path
  const token = req.header( "Authorization").replace("Bearer ","")
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    model.create({
      user_id : decoded.user_id,
      title : title,
      image:image
    })
    console.log("image successfully uploaded")
    res.status(200).json({message:"Successfully uploaded"})
  } catch (error) {
  
    res.status(404).json({message:"error"})
  }
}

const deleteuser = async(req,res)=>{
  const {id} = req.params
  const token = req.header( "Authorization").replace("Bearer ","")
  const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
  const data=await model.findOneAndDelete({_id:id})
  fs.unlink(data.image, (err) => {
    if (err) {
      console.error('Failed to delete image file:', err);
    } else {
      console.log('Image file deleted successfully');
    }
  });
  res.json(data)
}
module.exports={Postuserimage,getuserimage,deleteuser}