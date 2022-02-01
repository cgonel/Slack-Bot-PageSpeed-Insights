import pkg from '@slack/bolt';
const { App } = pkg;
import dotenv from 'dotenv';
import * as service from './service.js';

dotenv.config();

const app = new App({
    token: process.env.SLACK_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.command('/psi', async ({command, ack, respond}) => {
    await ack();

    // step: parse request to handle strategy option
    const request = service.defineRequest(`${command.text}`);
    const report = await service.generateReport(request);
    const parsedReport = service.parseReport(report);
    // const psiReport = await service.psiReport(`${command.text}`)

    await respond({
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `*Summary* \n*URL*: ${parsedReport._url}  \n *Strategy*: ${request.strategy}\n*Performance*: ${parsedReport._performance}`
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*Field Data* \nCumulative Layout Shift (CLS)              | 33ms\nFirst Contentful Paint (FCP)                  | 1.2s\nFirst Input Delay (FID)                           | 22ms\nLargest Contentful Paint (LCP)             | 2.3s"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*Lab Data*\nCumulative Layout Shift                        | 0.322\nFirst Contentful Paint                            | 3.1s\nLargest Contentful Paint                       | 15.7s\nSpeed Index                                           | 27.6s\nTime to Interactive                                | 75.3s\nTotal Blocking Time                               | 9,420ms"
                }
            }
        ]
    });
});

(async () => {
    await app.start(process.env.PORT || 3000);
    console.log("Bolt App is listening...")
})();