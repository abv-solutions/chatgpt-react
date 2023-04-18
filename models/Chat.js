const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const Schema = mongoose.Schema;

// Create chat schema
const ChatSchema = new Schema({
	content: {
		type: String,
		required: [true, 'Please add a message'],
		trim: true,
	},
	prompt: {
		type: String,
		required: [true, 'Please add a prompt'],
		trim: true,
	},
});

ChatSchema.plugin(timestamp);

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
