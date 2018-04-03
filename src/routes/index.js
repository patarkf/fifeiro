const express = require('express');

const router = express.Router();
const matchController = require('../controllers/matchController');
const leaderBoardController = require('../controllers/leaderBoardController');

/**
 * Slack always sends a POST request when working
 * with "slash commands".
 *
 * @see https://api.slack.com/slash-commands
 */
router.post('/match', matchController.create);
router.post('/leaderboard', leaderBoardController.list);

module.exports = router;
