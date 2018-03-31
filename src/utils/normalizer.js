/**
 * Extract info from slack "/match" command.
 * Command usage example: /match <@U5AA8EHGY|user1> 3 vs 0 <@U5A7VPR4D|user2>
 *
 * @param {*} match
 */
const getNormalizedMatch = (match) => {
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

module.exports = {
  getNormalizedMatch,
};