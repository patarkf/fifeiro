const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const leaderBoardSchema = new Schema({
  userSlackId: String,
  playedMatches: {
    type: Number,
    default: 0
  },
  won: {
    type: Number,
    default: 0
  },
  loss: {
    type: Number,
    default: 0
  },
  draw: {
    type: Number,
    default: 0
  },
  goalsScored: {
    type: Number,
    default: 0
  },
  goalsConceded: {
    type: Number,
    default: 0
  },
  goalsDifference: {
    type: Number,
    default: 0
  },
  points: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Get user by its slack id, if user exists, its document 
 * will be retrieved; if not, a new document will be 
 * created with the passed id and the default params.
 * 
 * @param {string} userSlackId
 * @returns {Object}
 */
 leaderBoardSchema.statics.findOneOrCreate = async function(userSlackId) {
  const query = { userSlackId };
  const options = { upsert : true, setDefaultsOnInsert: true, new: true };
  return await this.findOneAndUpdate(query, { userSlackId }, options);
};

leaderBoardSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('LeaderBoard', leaderBoardSchema);