// const psi = require('psi');
// const { dotenv } = require('dotenv').config();

import psi from 'psi';
import dotenv from 'dotenv';

dotenv.config()

class psiReports {
    private _url: string;
    private _strategy: string;
    private _performance: number;

    constructor(url, strategy?, performance?){
        this._url = url;
        this._strategy = strategy;
        this._performance = performance;
    }

    get url(){
        return this._url;
    }
    get strategy(){
        return this._strategy;
    }
    get performance(){
        return this._performance;
    }
}


export const psiReport = async (url) => {
    const { data } = await psi(url, {
        key: process.env.API_KEY
    });

    let urlReport = new psiReports(
        data.lighthouseResult.requestedUrl
    )

    return urlReport;
};

try {
        (async () => {
            // Get the PageSpeed Insights report
            const data = await psiReport('https://theverge.com');
            // console.log('Speed score:', data.lighthouseResult.categories.performance.score);          
            console.log(data.url)
            console.log(data.strategy)
            console.log(data.strategy)
        })();    
}catch(err){
    console.error(err)
}

