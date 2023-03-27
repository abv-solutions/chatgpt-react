const mongoose = require('mongoose');
const config = require('./config');
const mongo = `mongodb+srv://${config.MONGODB_USER}:${config.MONGODB_PASS}@${config.MONGODB_URI}`;
// Connect to MongoDB
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(mongo, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.log(`MongoDB Error: ${err.message}`);
		process.exit(1);
	}
};

module.exports = connectDB;
