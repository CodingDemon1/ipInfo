const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");

const authenticator = async (req, res, next) => {
	try {
		const token = req.heafers?.authorization?.split(" ")[1];
		if (!token) return res.status(403).json({ msg: "Please login again!!!" });

		const isTokenValid = await jwt.verify(token, process.env.jwtSecretCode);

		if (!isTokenValid) return res.json({ msg: "Authorization failed" });

		const isTokenBlacklisted = await redisClient.get(token);

		if (isTokenBlacklisted)
			return res.status(400).json({ msg: "Unauthorized" });

		req.body.userId = isTokenValid.userId;
		req.body.city = isTokenValid.city;

		next();
	} catch (error) {
		res.send(error.message);
	}
};

module.exports = { authenticator };
