const mongoose = require('mongoose');

const LeaderBoard = mongoose.model('LeaderBoard');
const { getFormattedMessage } = require('../messages/leaderBoard');
const { getErrorMessage } = require('../messages/error');
const { getLeaderBoardParams } = require('../utils/parameterExtractor');

/**
 * Show leaderboard data, which contains all user facts
 * information, ordering them by amount of points each
 * user has.
 *
 * @param {*} req
 * @param {*} res
 */
exports.list = async (req, res) => {
  try {
    const isDetailed = getLeaderBoardParams(req.body);

    const users = await LeaderBoard.find({}).sort('-points');
    res.send(getFormattedMessage(users, isDetailed));
  } catch (e) {
    res.send(getErrorMessage(e.message));
  }
};
