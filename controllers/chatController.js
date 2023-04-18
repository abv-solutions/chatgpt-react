const Chat = require('../models/Chat');
const config = require('../config/config');
const { Configuration, OpenAIApi } = require('openai');

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

// Ask ChatGPT
exports.askChatGPT = async (req, res) => {
	try {
		const configuration = new Configuration({
			apiKey: config.OPENAI_API_KEY,
		});

		const openai = new OpenAIApi(configuration);

		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			max_tokens: 64,
			messages: [{ role: 'user', content: req.query.prompt }],
		});

		completion?.data?.choices[0]?.message
			? res.status(200).json(completion?.data?.choices[0].message)
			: res.status(404).json({ msg: 'No message found' });
	} catch (err) {
		res.status(500).json({ msg: 'Something went wrong' });
	}
};

// Add chat
exports.addChat = async (req, res) => {
	try {
		// Save new chat to mongodb
		const chat = await Chat.create(req.body);
		res.status(201).json(chat);
	} catch (err) {
		res.status(500).json({ msg: err.message || 'Something went wrong' });
	}
};
