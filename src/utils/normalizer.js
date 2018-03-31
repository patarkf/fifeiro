/**
 * Extract info from slack "/match" command.
 * Command usage example: /match <@U5AA8EHGY|user1> 3 vs 0 <@U5A7VPR4D|user2>
 *
 * @param {*} match
 */
const getNormalizedMatch = (match) => {
  const matchFacts = match.text.split('vs').map(fact => fact.trim().split(' '));

  const [homeSlackId, homeScore] = matchFacts[0];
  const [awayScore, awaySlackId] = matchFacts[1];

  return {
    homeSlackId,
    homeScore,
    awaySlackId,
    awayScore,
  };
};

module.exports = {
  getNormalizedMatch,
};
