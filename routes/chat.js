const express = require('express');
const { getChat, addChat } = require('../controllers/chatController');

const router = express.Router();
router.route('/').get(getChat);
router.route('/').post(addChat);

module.exports = router;
