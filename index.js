const SlackBot = require('slackbots');

const bot = new SlackBot({
    token: process.env.SLACK_BOT_ID,
    name: process.env.SLACK_BOT_NAME
});

const channelName = process.env.SLACK_CHANNEL_NAME;

/**
 * @see https://api.slack.com/methods/
 */
bot.on('start', function() {
    bot.postMessageToChannel(channelName, "I'm just a lovely test");
});