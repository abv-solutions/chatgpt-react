const express = require('express');
const { getTodo, addTodo } = require('../controllers/TodoController');

const router = express.Router();
router.route('/').get(getTodo);
router.route('/').post(addTodo);

module.exports = router;
