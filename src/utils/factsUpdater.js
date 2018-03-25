const points = {
  won: 3,
  draw: 1,
  loss: 0
};

const isWin = (userScore, opponentScore) => userScore > opponentScore;

const isLoss = (userScore, opponentScore) => userScore < opponentScore;

const isDraw = (userScore, opponentScore) => userScore == opponentScore;

const updateScore = (score) => score + 1;

const updateHomeUserFacts = (user, match) => updateUserFacts(user, match.homeScore, match.awayScore);

const updateAwayUserFacts = (user, match) => updateUserFacts(user, match.awayScore, match.homeScore);

const updateUserFacts = (user, userScore, opponentScore) => {
  return {
    playedMatches: updateScore(user.playedMatches),
    won: isWin(userScore, opponentScore) ? updateScore(user.won) : user.won,
    loss: isLoss(userScore, opponentScore) ? updateScore(user.loss) : user.loss,
    draw: isDraw(userScore, opponentScore) ? updateScore(user.draw) : user.draw,
  };
};

module.exports = {
  isWin,
  isDraw,
  isLoss,
  updateScore,
  updateHomeUserFacts,
  updateAwayUserFacts,
  updateUserFacts
};