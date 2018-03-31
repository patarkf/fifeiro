/**
 * Number of points based on each available match result.
 */
const points = {
  win: 3,
  draw: 1,
  loss: 0,
};

/**
 * Check if user has won.
 *
 * @param {int} userScore
 * @param {int} opponentScore
 * @returns {boolean}
 */
const isWin = (userScore, opponentScore) => userScore > opponentScore;

/**
 * Check if user has lost.
 *
 * @param {int} userScore
 * @param {int} opponentScore
 * @returns {boolean}
 */
const isLoss = (userScore, opponentScore) => userScore < opponentScore;

/**
 * Check if user has drawn.
 *
 * @param {int} userScore
 * @param {int} opponentScore
 * @returns {boolean}
 */
const isDraw = (userScore, opponentScore) => userScore === opponentScore;

/**
 * Update user current score.
 *
 * @param {int} score
 * @returns {int}
 */
const updateScore = score => score + 1;

/**
 * Update user current goals score.
 *
 * @param {int} gs
 * @param {int} matchGs
 * @returns {int}
 */
const updateGoalsScore = (gs, matchGs) => gs + matchGs;

/**
 * Update user current goals conceded.
 *
 * @param {int} gc
 * @param {int} matchGc
 * @returns {int}
 */
const updateGoalsConceded = (gc, matchGc) => gc + matchGc;

/**
 * Update user goals difference.
 *
 * @param {int} matchGs
 * @param {int} matchGc
 * @param {int} goalsScored
 * @param {int} goalsConceded
 * @returns {int}
 */
const updateGoalsDifference = (matchGs, matchGc, { goalsScored, goalsConceded }) => {
  const currentGs = matchGs + goalsScored;
  const currentGc = matchGc + goalsConceded;

  return currentGs - currentGc;
};

/**
 * Update user points based on match result.
 *
 * @param {int} userScore
 * @param {int} opponentScore
 * @param {int} currentPoints
 * @returns {int}
 */
const updatePoints = (userScore, opponentScore, currentPoints) => {
  if (isWin(userScore, opponentScore)) return currentPoints + points.win;
  if (isDraw(userScore, opponentScore)) return currentPoints + points.draw;
  if (isLoss(userScore, opponentScore)) return currentPoints + points.loss;

  return userScore;
};

/**
 * Update user leaderboard facts based on match result.
 *
 * @param {Object} user
 * @param {int} userScore
 * @param {int} opponentScore
 * @returns {Object}
 */
const updateUserFacts = (user, userScore, opponentScore) => ({
  playedMatches: updateScore(user.playedMatches),
  won: isWin(userScore, opponentScore) ? updateScore(user.won) : user.won,
  loss: isLoss(userScore, opponentScore) ? updateScore(user.loss) : user.loss,
  draw: isDraw(userScore, opponentScore) ? updateScore(user.draw) : user.draw,
  points: updatePoints(userScore, opponentScore, user.points),
  goalsScored: updateGoalsScore(user.goalsScored, userScore),
  goalsConceded: updateGoalsConceded(user.goalsConceded, opponentScore),
  goalsDifference: updateGoalsDifference(userScore, opponentScore, user),
});

module.exports = {
  isWin,
  isDraw,
  isLoss,
  updateScore,
  updateUserFacts,
  updateGoalsScore,
  updateGoalsConceded,
  updateGoalsDifference,
};
