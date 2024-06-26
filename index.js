require('dotenv').config();
const express = require("express")
const app = express()
const path = require("path")
const cors = require('cors')
const model = require("./model/user.js")
const userimagemodel = require("./model/userimage.js")
const { getconnection } = require("./connection.js")
const port = process.env.PORT || 3000;
const user_router = require("./routers/user.js")
const profile_router = require("./routers/profile.js")
const userimage_router = require("./routers/userimage.js")
const bodyParser = require('body-parser');


getconnection(process.env.MONGOOSE).then(()=>{console.log("Connected")}).catch((error)=>{console.log("not connected : " , error)})
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname)))

app.get("/hello",(req,res)=>{
    res.send("hello")
})
app.use("/",userimage_router)
app.use("/",user_router)
app.use("/",profile_router)
app.listen(port,()=>{console.log(`server connected on port ${port}`)})