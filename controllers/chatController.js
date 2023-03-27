const Chat = require('../models/Chat');

// Get chat
exports.getChat = async (req, res) => {
	try {
		const items = await Chat.find();
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json({ msg: 'Something went wrong' });
	}
};

// Add chat
exports.addChat = async (req, res) => {
	// Get fields from request body
	const { message } = req.body;
	// Validation for empty fields
	if (!message) {
		return res.status(400).json({ msg: 'Please add a message' });
	}
	// Create new item model
	const newChat = new Chat({
		message,
	});
	try {
		// Save new chat to mongodb
		const chat = await newChat.save();
		res.status(201).json(chat);
	} catch (err) {
		res.status(500).json({ msg: 'Something went wrong' });
	}
};
