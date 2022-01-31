const { App } = require('@slack/bolt'); 

const app = new App({
    token: process.env.SLACK_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.command('/psi', async ({command, ack, respond}) => {
    await ack();

    await respond(`${command.text}`);
});

(async () => {
    await app.start(process.env.PORT || 3000);
})();