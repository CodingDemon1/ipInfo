const { login, register, logout } = require("../controllers/user.controller");
const { authenticator } = require("../middlewares/auth");

const userRoute = require("express").Router();

userRoute.post("/login", login);
userRoute.post("/register", register);
userRoute.get("/logout", authenticator, logout);

module.exports = { userRoute };
