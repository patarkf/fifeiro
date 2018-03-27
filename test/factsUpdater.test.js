const facts = require('../src/utils/factsUpdater');

describe('Should correctly check and assign match results on leaderboard', () => {
  it('works when user has won the match', () => {
    expect(facts.isWin(2, 1)).toBeTruthy();
  });
  
  it('works when match has been a draw', () => {
    expect(facts.isDraw(2, 2)).toBeTruthy();
  });
  
  it('works when user has loss the match', () => {
    expect(facts.isLoss(1, 2)).toBeTruthy();
  });

  it('works when increasing facts numbers', () => {
    expect(facts.updateScore(4)).toBe(5);
  });
});

describe('Should update user leaderboard facts correctly', () => {
  const defaultUserFacts = {
    playedMatches: 0,
    won: 0,
    loss: 0,
    draw: 0,
    goalsScored: 0,
    goalsConceded: 0,
    goalsDifference: 0,
    points: 0
  };

  it('works when user has won', () => {
    const match = { homeScore: 3, awayScore: 2 };
    const expectedUserFacts = { playedMatches: 1, won: 1 };
  
    const resp = facts.updateUserFacts(defaultUserFacts, match.homeScore, match.awayScore);
    expect(resp).toMatchObject(expectedUserFacts);
  });

  it('works when match has been a draw', () => {
    const match = { homeScore: 3, awayScore: 3 };
    const expectedUserFacts = { playedMatches: 1, draw: 1 };
  
    const resp = facts.updateUserFacts(defaultUserFacts, match.homeScore, match.awayScore);
    expect(resp).toMatchObject(expectedUserFacts);
  });

  it('works when user has loss', () => {
    const match = { homeScore: 2, awayScore: 3 };
    const expectedUserFacts = { playedMatches: 1, loss: 1 };
  
    const resp = facts.updateUserFacts(defaultUserFacts, match.homeScore, match.awayScore);
    expect(resp).toMatchObject(expectedUserFacts);
  });

  it('works when user scores goals', () => {
    const match = { homeScore: 3, awayScore: 2 };
    const expectedUserFacts = { goalsScored: 3 };

    const resp = facts.updateUserFacts(defaultUserFacts, match.homeScore, match.awayScore);
    expect(resp).toMatchObject(expectedUserFacts);
  });

  it('works when user concedes goals', () => {
    const match = { homeScore: 2, awayScore: 3 };
    const expectedUserFacts = { goalsConceded: 3 };

    const resp = facts.updateUserFacts(defaultUserFacts, match.homeScore, match.awayScore);
    expect(resp).toMatchObject(expectedUserFacts);
  });

  it('works when calculating goals difference', () => {
    const match = { homeScore: 3, awayScore: 2 };
    const expectedUserFacts = { goalsDifference: 1 };

    const resp = facts.updateUserFacts(defaultUserFacts, match.homeScore, match.awayScore);
    expect(resp).toMatchObject(expectedUserFacts);
  });

  it('works when setting win points', () => {
    const match = { homeScore: 3, awayScore: 2 };
    const expectedUserFacts = { points: 3 };

    const resp = facts.updateUserFacts(defaultUserFacts, match.homeScore, match.awayScore);
    expect(resp).toMatchObject(expectedUserFacts);
  });

  it('works when setting loss points', () => {
    const match = { homeScore: 2, awayScore: 3 };
    const expectedUserFacts = { points: 0 };

    const resp = facts.updateUserFacts(defaultUserFacts, match.homeScore, match.awayScore);
    expect(resp).toMatchObject(expectedUserFacts);
  });

  it('works when setting draw points', () => {
    const match = { homeScore: 2, awayScore: 2 };
    const expectedUserFacts = { points: 1 };

    const resp = facts.updateUserFacts(defaultUserFacts, match.homeScore, match.awayScore);
    expect(resp).toMatchObject(expectedUserFacts);
  });
});
