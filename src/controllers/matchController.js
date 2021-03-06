const mongoose = require('mongoose');

const Match = mongoose.model('Match');
const LeaderBoard = mongoose.model('LeaderBoard');
const { getMatchParams } = require('../utils/parameterExtractor');
const { updateUserFacts } = require('../utils/factsUpdater');
const { getFormattedMessage } = require('../messages/match');
const { getErrorMessage } = require('../messages/error');

/**
 * Create a match between two players (slack users) and
 * store their scores.
 *
 * @param {*} req
 * @param {*} res
 */
exports.create = async (req, res) => {
  try {
    const matchParams = getMatchParams(req.body);
    const match = await new Match(matchParams).save();

    const homeUserFacts = await LeaderBoard.findOneOrCreate(match.homeSlackId);
    const awayUserFacts = await LeaderBoard.findOneOrCreate(match.awaySlackId);

    const updatedHomeUserFacts = updateUserFacts(homeUserFacts, match.homeScore, match.awayScore);
    const updatedAwayUserFacts = updateUserFacts(awayUserFacts, match.awayScore, match.homeScore);

    await LeaderBoard.update({ _id: homeUserFacts._id }, { $set: updatedHomeUserFacts });
    await LeaderBoard.update({ _id: awayUserFacts._id }, { $set: updatedAwayUserFacts });

    res.send(getFormattedMessage(match));
  } catch (e) {
    res.send(getErrorMessage(e.message));
  }
};
