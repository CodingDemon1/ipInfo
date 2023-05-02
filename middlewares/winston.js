const winston = require("winston");
const { MongoDB } = require("winston-mongodb");

const logger = winston.createLogger({
	level: "Info",
	format: winston.format.json(),
	transports: [
		new MongoDB({
			db: process.env.mongoURL,
			collection: "logs",
			options: {
				useUnifiedtapology: true,
			},
		}),
	],
});

module.exports = { logger };
