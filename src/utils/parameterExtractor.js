/**
 * Extract info from slack "/match" command.
 * Command usage example: /match <@U5AA8EHGY|user1> 3 vs 0 <@U5A7VPR4D|user2>
 *
 * @param {string} match
 * @returns {Object}
 */
const getMatchParams = (match) => {
  try {
    const matchFacts = match.text.split('vs').map(fact => fact.trim().split(' '));

    const [homeSlackId, homeScore] = matchFacts[0];
    const [awayScore, awaySlackId] = matchFacts[1];

    return {
      homeSlackId,
      homeScore,
      awaySlackId,
      awayScore,
    };
  } catch (e) {
    throw new Error('Command could not be parsed. Please, try again.');
  }
};

/**
 * Extract info from slack "/leaderboard" command.
 * Command usage example: /leaderboard detailed ("detailed" is optional)
 *
 * @param {string} leaderBoard
 * @returns {Object}
 */
const getLeaderBoardParams = (leaderBoard) => {
  try {
    const acceptedParams = [
      'detailed',
    ];

    if (!leaderBoard.text.length) {
      return false;
    }

    if (!acceptedParams.includes(leaderBoard.text)) {
      throw new Error(`"${leaderBoard.text}" is not an acceptable parameter.`);
    }

    return true;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getMatchParams,
  getLeaderBoardParams,
};
