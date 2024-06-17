const express = require("express")

const { postSignup,postLogin,postForgot } = require("../controller/user")
const routes = express.Router()


routes.post("/signup", postSignup)
routes.route("/login").post(postLogin)
routes.route("/forgot").put(postForgot)

module.exports = routes
