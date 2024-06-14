const model = require("../model/user")
const jwt = require("jsonwebtoken")

const getProfile=async(req,res)=>{
  try {
    const token = req.header("Authorization").replace("Bearer ","")
  
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    const user = await model.findOne({_id:decoded.user_id})
    if(user){
     return res.status(201).json({user:user})
    }
  } catch (error) {
    console.log("token not exist")
  }



}
module.exports = {getProfile}