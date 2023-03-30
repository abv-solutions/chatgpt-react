const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create todo schema
const TodoSchema = new Schema({
	id: {
		type: Number,
		required: [true, 'Please add an id'],
	},
	userId: {
		type: Number,
		required: [true, 'Please add a user id'],
	},
	completed: {
		type: Boolean,
	},
	title: {
		type: String,
		required: [true, 'Please add a title'],
		trim: true,
	},
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
