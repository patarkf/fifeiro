/**
 * Slack successful match response message.
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

/**
 * Slack bad match error response message.
 * 
 * @param {string} homeSlackId
 * @param {string} awaySlackId
 * @returns {Object}
 * 
 * @see https://api.slack.com/docs/message-formatting
 */
const getErrorMessage = (message) => ({
  text: `Oops! Something went wrong: Please, check it out: \`${message}\` `,
  color: 'bad',
});

module.exports = {
  getFormattedMessage,
  getErrorMessage,
};
