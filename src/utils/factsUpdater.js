const points = {
  win: 3,
  draw: 1,
  loss: 0
};

const isWin = (userScore, opponentScore) => userScore > opponentScore;

const isLoss = (userScore, opponentScore) => userScore < opponentScore;

const isDraw = (userScore, opponentScore) => userScore == opponentScore;

const updateScore = (score) => score + 1;

const updateGoalsScore = (currentScoredGoals, matchScoredGoals) => currentScoredGoals + matchScoredGoals;

const updateGoalsConceded = (currentConcededGoals, matchConcededGoals) => currentConcededGoals + matchConcededGoals;

const updateGoalsDifference = (matchScoredGoals, matchConcededGoals, { goalsScored, goalsConceded }) => {
  const currentScoredGoals = matchScoredGoals + goalsScored;
  const currentConcededGoals = matchConcededGoals + goalsConceded;
  
  return currentScoredGoals - currentConcededGoals;
};

const updatePoints = (userScore, opponentScore, currentPoints) => {
  if (isWin(userScore, opponentScore)) return currentPoints + points.win;
  if (isDraw(userScore, opponentScore)) return currentPoints + points.draw;
  if (isLoss(userScore, opponentScore)) return currentPoints + points.loss;
};

const updateUserFacts = (user, userScore, opponentScore) => {
  return {
    playedMatches: updateScore(user.playedMatches),
    won: isWin(userScore, opponentScore) ? updateScore(user.won) : user.won,
    loss: isLoss(userScore, opponentScore) ? updateScore(user.loss) : user.loss,
    draw: isDraw(userScore, opponentScore) ? updateScore(user.draw) : user.draw,
    points: updatePoints(userScore, opponentScore, user.points),
    goalsScored: updateGoalsScore(user.goalsScored, userScore),
    goalsConceded: updateGoalsConceded(user.goalsConceded, opponentScore),
    goalsDifference: updateGoalsDifference(userScore, opponentScore, user),
  };
};

module.exports = {
  isWin,
  isDraw,
  isLoss,
  updateScore,
  updateUserFacts,
  updateGoalsScore,
  updateGoalsConceded,
  updateGoalsDifference
};