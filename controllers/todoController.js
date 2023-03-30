const Todo = require('../models/Todo');

// Get Todo
exports.getTodo = async (req, res) => {
	try {
		// Create query
		let query = {};
		req.query.completed && (query.completed = req.query.completed);
		req.query.userId && (query.userId = req.query.userId);
		// Execute query
		const messages = await Todo.find(query)
			.limit(req.query.limit || 50)
			.select({
				_id: 0,
				userId: 1,
				title: 1,
				completed: 1,
			});
		messages
			? res.status(200).json(messages)
			: res.status(404).json({ msg: 'No todos found' });
	} catch (err) {
		res.status(500).json({ msg: 'Something went wrong' });
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
