const psi = require('psi');
const { dotenv } = require('dotenv').config();

let psiReport = (async (url) => {
    await psi.output(url, {
        key: process.env.API_KEY
    });
})();
