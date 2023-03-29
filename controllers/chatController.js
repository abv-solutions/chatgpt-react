const Chat = require('../models/Chat');

// Get chat
exports.getChat = async (req, res) => {
	try {
		const message = await Chat.findOne({ prompt: req.query.prompt });
		message
			? res.status(200).json(message)
			: res.status(404).json({ msg: 'No message found' });
	} catch (err) {
		res.status(500).json({ msg: 'Something went wrong' });
	}
};

// Add chat
exports.addChat = async (req, res) => {
	try {
		// Save new chat to mongodb
		const chat = await Chat.insertMany(req.body);
		res.status(201).json(chat);
	} catch (err) {
		res.status(500).json({ msg: err.message || 'Something went wrong' });
	}
};
