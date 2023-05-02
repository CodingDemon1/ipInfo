const mongoose = require("mongoose");

const userScrema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	city: { type: String, required: true },
});

const userModel = mongoose.model("ipuser", userScrema);

module.exports = { userModel };
