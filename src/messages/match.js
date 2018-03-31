/**
 * Slack response message after an user creates a new match.
 *
 * @param {string} homeSlackId
 * @param {string} awaySlackId
 * @returns {Object}
 *
 * @see https://api.slack.com/docs/message-formatting
 */
const getFormattedMessage = ({ homeSlackId, awaySlackId }) => ({
  text: `Match created between ${homeSlackId} and ${awaySlackId}!`,
  color: 'good',
});

module.exports = {
  getFormattedMessage,
};
