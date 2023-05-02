const express = require("express");
const connection = require("./config/db.js");
const { userRoute } = require("./routes/user.routes.js");
const { logger } = require("./middlewares/winston.js");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
	try {
		res.json({ msg: "Basic Endpoint" });
	} catch (error) {
		res.send(error.message);
	}
});

app.use("/user", userRoute);

app.listen(PORT, async () => {
	try {
		await connection;
		console.log("Connected to db");
		// logger.log("info", "DB Connected");
	} catch (error) {
		console.log(error.message);
		// logger.log("info", "DB Connection failed");
	}
	console.log("Server is Running");
});
