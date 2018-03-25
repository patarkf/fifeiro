const mongoose = require('mongoose');
const Match = mongoose.model('Match');
const LeaderBoard = mongoose.model('LeaderBoard');
const { getNormalizedMatch } = require('../utils/normalizer');
const { updateHomeUserFacts, updateAwayUserFacts} = require('../utils/factsUpdater');

/**
 * Create a match between two players (slack users) and
 * store their scores.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.create = async (req, res, next) => {
  const normalizedMatch = getNormalizedMatch(req.body);
  const match = await new Match(normalizedMatch).save();

  const homeUserFacts = await LeaderBoard.findOneOrCreate(match.homeSlackId);
  const awayUserFacts = await LeaderBoard.findOneOrCreate(match.awaySlackId);

  const updatedHomeUserFacts = updateHomeUserFacts(homeUserFacts, match);
  const updatedAwayUserFacts = updateAwayUserFacts(awayUserFacts, match);

  await LeaderBoard.update({ _id: homeUserFacts._id }, { $set: updatedHomeUserFacts});
  await LeaderBoard.update({ _id: awayUserFacts._id }, { $set: updatedAwayUserFacts});

  res.send({
    text: `Match created between ${match.homeSlackId} and ${match.awaySlackId}!`,
    color: 'good'
  });
};