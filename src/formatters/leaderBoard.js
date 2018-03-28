const emojis = {
  trophy: ':trophy:',
  firstPlace: ':first_place_medal:',
  secondPlace: ':second_place_medal:',
  thirdPlace: ':third_place_medal:',
  fire: ':fire:',
  soccer: ':soccer:'
};

const positions = {
  firstPlace: 1,
  secondPlace: 2,
  thirdPlace: 3
};

const colors = {
  firstPlace: '#C98910',
  secondPlace: '#A8A8A8',
  thirdPlace: '#965A38',
  others: '#CCC2C2'
};

const getEmoji = (userPosition) => {
  if (userPosition == positions.firstPlace) return emojis.firstPlace;
  if (userPosition == positions.secondPlace) return emojis.secondPlace;
  if (userPosition == positions.thirdPlace) return emojis.thirdPlace;
  if (userPosition > positions.thirdPlace) return '';
};

const getColor = (userPosition) => {
  if (userPosition == positions.firstPlace) return colors.firstPlace
  if (userPosition == positions.secondPlace) return colors.secondPlace
  if (userPosition == positions.thirdPlace) return colors.thirdPlace
  if (userPosition > positions.thirdPlace) return colors.others
}

const getMessage = (users) => {
  const formattedMessage = {
    text: `Leaderboard ${emojis.trophy} ${emojis.fire}`,
    attachments: []
  };

  users.forEach((user, key) => {
    const userFacts = getUserLeaderBoardRow(user, userPosition = key + 1);
    formattedMessage.attachments.push(userFacts);
  });

  return formattedMessage;
};

const getUserLeaderBoardRow = (user, userPosition) => {
  return {
    author_name: `#${userPosition} - ${user.userSlackId} ${getEmoji(userPosition)}`,
    color: getColor(userPosition),
    fields: [{
        value: `\`Points: ${user.points}\``,
        'short': true
      },
      {
        value: `\`W: ${user.won}\``,
        'short': true
      },
      {
        value: `\`L: ${user.loss}\``,
        'short': true
      },
      {
        value: `\`D: ${user.draw}\``,
        'short': true
      },
      {
        value: `\`GS: ${user.goalsScored}\``,
        'short': true
      },
      {
        value: `\`GC: ${user.goalsConceded}\``,
        'short': true
      }
    ]
  }
};

module.exports = {
  getMessage
};