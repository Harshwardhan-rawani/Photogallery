const model = require("../model/user.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//------------------------------------Signup-------------------------------------//

async function createToken(payload){
  return  jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
}
const postSignup = async(req,res)=>
{
   try {
      const {username,email,password,confirm_password,phone}=req.body
      const user =await model.findOne({email})
      if(!user){
         
      
        const hashedPassword = await bcrypt.hash(password,10);

       await model.create({username:username,
        email:email,
        password:hashedPassword,
        phone:phone,
        image:"nan"
    }).then(()=>{console.log("User data added to database")})
      return  res.status(200).json({message:"Successfull Register"})
      }
      console.log("user already exist")
     return res.status(404).json({message:"User Already Exist"})
   } catch (error) {
     console.log("validation error :",error)
   }
}





//------------------------------------login-------------------------------------//

const postLogin = async(req,res)=>{
    try {
        const {email,password}=req.body
        const user = await model.findOne({email})
   
        if(user){
            const payload={user_id:user._id,usermail : user.email}
            const token=await createToken(payload)
            const isMatch = await bcrypt.compare(password, user.password)
     
            if(isMatch){
                console.log("Successfully Login")
                 return  res.status(201).json({message:"Successfully Login",token:token})
                }
                 console.log("Wrong credential")
                return res.status(404).json({message:"Wrong Credential"})

        }
        console.log("user Not Register")
        return res.status(404).json({message:"User Not Register"})
    } catch (error) {
        res.json({message : "error"})
        console.log("validation error : ",error)
    }
}

// ----------------------------------forgot password--------------------------
function verifytoken(token){
    return jwt.verify(token,process.env.JWT_SECRET_KEY)
}
const postForgot = async(req,res)=>{
    try{
    const {email,password,confirm_password}=req.body
    const token =req.header("Authorization").replace("Bearer ","")
    const decode = verifytoken(token)

    const hashpassword = await bcrypt.hash(password,10)
    const user = await model.findOneAndUpdate({email},{$set:{password:hashpassword}},{new : true})
 
    if(user){
        if(decode.usermail !== user.email) return res.status(404).json({message:"Enter valid Mail"})
        console.log("Successfully Updated")
        return res.status(200).json({message: "Successfully Updated"})
    }
    console.log("User Have not logged In")
    return res.status(404).json({message: "User Have not logged In"})
}
catch(error){
    console.log("Request argument is wrong")
    return res.status(404).json({message:"Request Argument is wrong"})
}

}
module.exports = {postSignup,postLogin,postForgot}

