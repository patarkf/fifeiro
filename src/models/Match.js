const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const matchSchema = new Schema({
  homeSlackId: String,
  homeScore: Number,
  awaySlackId: String,
  awayScore: Number,
  createdAt: { type: Date, default: Date.now },
});

matchSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Match', matchSchema);
