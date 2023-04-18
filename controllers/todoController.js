const Todo = require('../models/Todo');

// Get Todo
exports.getTodo = async (req, res) => {
	try {
		// Create query
		let query = {};
		const regex = new RegExp(req.query.title, 'i');
		req.query.completed && (query.completed = req.query.completed);
		req.query.userId && (query.userId = JSON.parse(req.query.userId));
		req.query.title && (query.title = { $regex: regex });
		// Execute query
		const messages = await Todo.find(query)
			.limit(req.query.limit || 50)
			.select({ _id: 0, __v: 0, id: 0 });
		messages.length > 0
			? res.status(200).json(messages)
			: res.status(404).json({ msg: 'No todos found' });
	} catch (err) {
		res.status(500).json({ msg: err.message || 'Something went wrong' });
	}
};

// Add Todo
exports.addTodo = async (req, res) => {
	try {
		// Save new Todos to mongodb
		const todo = await Todo.create(req.body);
		res.status(201).json(todo);
	} catch (err) {
		res.status(500).json({ msg: err.message || 'Something went wrong' });
	}
};
