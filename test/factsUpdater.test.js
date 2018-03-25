const facts = require('../src/utils/factsUpdater');

test('checks if user has won the match', () => {
  expect(facts.isWin(2, 1)).toBe(true);
});

test('checks if match has been a draw', () => {
  expect(facts.isDraw(2, 2)).toBe(true);
});

test('checks if user has loss the match', () => {
  expect(facts.isLoss(1, 2)).toBe(true);
});

test('checks if facts numbers are being correctly increased', () => {
  expect(facts.updateScore(4)).toBe(5);
});