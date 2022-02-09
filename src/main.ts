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

    const input = `${command.text}`

    if(input.includes("--strategy")){
        const parsedInput = service.parseInput(input);
        var request = service.defineRequest(parsedInput[0], parsedInput[1]);
    } 
    else {
        var request = service.defineRequest(input);
    }

    const report = await service.generateReport(request);
    const parsedReport = service.parseReport(report);

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
                    "text": `*Metrics* \nFirst Contentful Paint                            | ${parsedReport._firstContentfulPaint}\nSpeed Index                                            | ${parsedReport._speedIndex}\nLargest Contentful Paint                        | ${parsedReport._largestContentfulPaint}\nTime to Interactive                                | ${parsedReport._timeToInteractive}\nTotal Blocking Time                               | ${parsedReport._totalBlockingTime}\nCumulative Layout Shift                       | ${parsedReport._cumulativeLayoutShift}`
                }
            }
        ]
    });
});

(async () => {
    await app.start(process.env.PORT || 3000);
    console.log("Bolt App is listening...")
})();