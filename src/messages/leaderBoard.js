/**
 * Slack emojis used on leaderboard message response.
 */
const emojis = {
  trophy: ':trophy:',
  firstPlace: ':first_place_medal:',
  secondPlace: ':second_place_medal:',
  thirdPlace: ':third_place_medal:',
  fire: ':fire:',
  soccer: ':soccer:',
};

/**
 * First three leaderboard positions.
 */
const positions = {
  firstPlace: 1,
  secondPlace: 2,
  thirdPlace: 3,
};

/**
 * Colors used to represent leaderboard users positions:
 *
 * - Gold (1st place);
 * - Silver (2nd place);
 * - Bronze (3rd place);
 * - Nude (for other positions).
 */
const colors = {
  firstPlace: '#C98910',
  secondPlace: '#A8A8A8',
  thirdPlace: '#965A38',
  others: '#CCC2C2',
};

/**
 * Get an emoji medal based on current user position.
 *
 * @param {int} userPosition
 * @returns {string}
 */
const getEmoji = (userPosition) => {
  if (userPosition === positions.firstPlace) return emojis.firstPlace;
  if (userPosition === positions.secondPlace) return emojis.secondPlace;
  if (userPosition === positions.thirdPlace) return emojis.thirdPlace;

  return '';
};

/**
 * Get color based on current user position. Each color represent
 * the current user position on leaderboard.
 *
 * @param {int} userPosition
 * @returns {string}
 */
const getColor = (userPosition) => {
  if (userPosition === positions.firstPlace) return colors.firstPlace;
  if (userPosition === positions.secondPlace) return colors.secondPlace;
  if (userPosition === positions.thirdPlace) return colors.thirdPlace;

  return colors.others;
};

/**
 * Add and format facts for each leaderboard user based on its numbers.
 *
 * @param {Object} user
 * @param {int} userPosition
 * @returns {Object}
 */
const getUserLeaderBoardRow = (user, userPosition) => ({
  author_name: `#${userPosition} - ${user.userSlackId} ${getEmoji(userPosition)}`,
  color: getColor(userPosition),
  fallback: 'Leaderboard info',
  fields: [{
    value: `\`Played: ${user.playedMatches}\``,
    short: true,
  },
  {
    value: `\`Won: ${user.won}\``,
    short: true,
  },
  {
    value: `\`Drawn: ${user.draw}\``,
    short: true,
  },
  {
    value: `\`Lost: ${user.loss}\``,
    short: true,
  },
  {
    value: `\`GS: ${user.goalsScored}\``,
    short: true,
  },
  {
    value: `\`GC: ${user.goalsConceded}\``,
    short: true,
  },
  {
    value: `\`Points: ${user.points}\``,
    short: true,
  },
  ],
});

/**
 * Slack response message when user wants to see the current
 * leaderboard facts.
 *
 * @param {Array} users
 * @returns {Object}
 *
 * @see https://api.slack.com/docs/message-attachments
 */
const getFormattedMessage = (users) => {
  const formattedMessage = {
    text: `Leaderboard ${emojis.trophy} ${emojis.fire}`,
    attachments: [],
  };

  users.forEach((user, key) => {
    const userPosition = key + 1;
    const userFacts = getUserLeaderBoardRow(user, userPosition);
    formattedMessage.attachments.push(userFacts);
  });

  return formattedMessage;
};

module.exports = {
  getEmoji,
  getColor,
  getFormattedMessage,
  getUserLeaderBoardRow,
};
