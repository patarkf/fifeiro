const express = require('express');

const router = express.Router();
const matchController = require('../controllers/matchController');
const leaderBoardController = require('../controllers/leaderBoardController');
const { catchErrors } = require('../handlers/errorHandlers');

/**
 * Slack always sends a POST request when working
 * with "slash commands".
 *
 * @see https://api.slack.com/slash-commands
 */
router.post('/match', catchErrors(matchController.create));
router.post('/leaderboard', catchErrors(leaderBoardController.list));

module.exports = router;
