const mongoose = require('mongoose');
const Match = mongoose.model('Match');
const LeaderBoard = mongoose.model('LeaderBoard');
const { getNormalizedMatch } = require('../utils/normalizer');
const { updateUserFacts} = require('../utils/factsUpdater');
const { getFormattedMessage } = require('../messages/match');

/**
 * Create a match between two players (slack users) and
 * store their scores.
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.create = async (req, res) => {
  const normalizedMatch = getNormalizedMatch(req.body);
  const match = await new Match(normalizedMatch).save();

  const homeUserFacts = await LeaderBoard.findOneOrCreate(match.homeSlackId);
  const awayUserFacts = await LeaderBoard.findOneOrCreate(match.awaySlackId);

  const updatedHomeUserFacts = updateUserFacts(homeUserFacts, match.homeScore, match.awayScore);
  const updatedAwayUserFacts = updateUserFacts(awayUserFacts, match.awayScore, match.homeScore);

  await LeaderBoard.update({ _id: homeUserFacts._id }, { $set: updatedHomeUserFacts});
  await LeaderBoard.update({ _id: awayUserFacts._id }, { $set: updatedAwayUserFacts});

  res.send(getFormattedMessage(match));
};