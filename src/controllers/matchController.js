const mongoose = require('mongoose');
const Match = mongoose.model('Match');
const { getNormalizedMatch } = require('../utils/normalizer');

/**
 * Creates a match between two players (slack users) and
 * store their scores.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.create = async (req, res, next) => {
  const normalizedMatch = getNormalizedMatch(req.body);
  const match = await new Match(normalizedMatch).save();

  res.send({
    text: `Match created between ${match.homeSlackId} and ${match.awaySlackId}!`,
    color: 'good'
  });
};