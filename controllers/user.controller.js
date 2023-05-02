const { userModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { redisClient } = require("../config/redis");
require("dotenv").config();

const register = async (req, res) => {
	try {
		const { name, email, password, city } = req.body;

		const isUserPresent = await userModel.findOne({ email });

		if (isUserPresent)
			return res
				.status(400)
				.json({ msg: "User is already present, Please Login" });

		const hash = await bcrypt.hash(password, 5);
		const newUser = new userModel({ name, email, password, city });

		await newUser.save();

		res.status(200).json({ msg: "Registration Successfull!!!" });
	} catch (error) {
		res.send(error.message);
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const isUserPresent = await userModel.findOne({ email });

		if (!isUserPresent)
			return res
				.status(404)
				.json({ msg: "User is not present, Pleasr Register!!!" });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			isUserPresent.password
		);

		if (!isPasswordCorrect)
			return res.status(400).json({ msg: "Invalid Credentials" });

		const token = await jwt.sign(
			{
				userId: isUserPresent._id,
				city: isUserPresent.city,
			},
			process.env.jwtSecretCode,
			{ expiresIn: "1hr" },

			res.status(200).json({ msg: "Login Seccress" }, token)
		);
	} catch (error) {
		res.send(error.message);
	}
};

const logout = async (req, res) => {
	try {
		const token = req.heafers?.authorization?.split(" ")[1];

		if (!token) return res.status(403);

		await redisClient.set("token", token);
		res.status(200).json({ msg: "Logout Successfull" });
	} catch (error) {
		res.send(error.message);
	}
};

module.exports = { login, logout, register };
