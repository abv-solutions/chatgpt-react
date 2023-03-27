const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const Schema = mongoose.Schema;

// Create chat schema
const ChatSchema = new Schema({
	message: {
		type: String,
		required: [true, 'Please add a message'],
		trim: true,
	},
});

ChatSchema.plugin(timestamp);

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
