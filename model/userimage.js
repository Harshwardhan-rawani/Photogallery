const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_id:{
        type : String,
        required : true
    },
 
    title:{
        type : String,
        required : true
    },
 
    image :{
        type :String,
        required : true
    }
});

const user = mongoose.model("user_image", userSchema)
module.exports= user