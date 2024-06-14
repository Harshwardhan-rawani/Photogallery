const mongodb = require("mongoose")

const getconnection = (url)=>{
    return mongodb.connect(url)
}

module.exports = { getconnection }