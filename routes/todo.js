const express = require('express');
const { getTodo, addTodo } = require('../controllers/todoController');

const router = express.Router();
router.route('/').get(getTodo);
router.route('/').post(addTodo);

module.exports = router;
