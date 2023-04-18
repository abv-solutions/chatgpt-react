const express = require('express');
const {
	getChat,
	addChat,
	askChatGPT,
} = require('../controllers/chatController');

const router = express.Router();
router.route('/').get(getChat);
router.route('/ask').get(askChatGPT);
router.route('/').post(addChat);

module.exports = router;
