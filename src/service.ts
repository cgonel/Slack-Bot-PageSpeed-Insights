// const psi = require('psi');
// const { dotenv } = require('dotenv').config();

import psi from 'psi';
import dotenv from 'dotenv';

dotenv.config();
class PsiRequest {
    private _url: string;
    private _strategy: string;

    constructor(url : string, strategy : string = 'mobile'){
        this._url = url;
        this._strategy = strategy;
    }

    get url(){
        return this._url;
    }
    get strategy(){
        return this._strategy;
    }

    async generateReport(){
        const psiReport = await psi(this._url, {
            key: process.env.API_KEY,
            strategy: this._strategy
        });
        // return psiReport.data.lighthouseResult.categories.performance.score;
        return psiReport;
    }
}

class ParsedReport {
    private _report;
    public _url: string;
    public _performance: number;
    public _cumulativeLayoutShift: string;
    public _firstContentfulPaint: string;
    public _firstInputDelay: string;
    public _largestContentfulPaint: string;
    public _cumulativeLayoutShiftLB: string;
    public _firstContentfulPaintLB: string;
    public _speedIndex: string;
    public _timeToInteractive: string;
    public _totalBlockingTime: string;

    constructor(report){
        this._report = report;
        this._url =  this._report.data.lighthouseResult.requestedUrl;
        this._performance = this._report.data.lighthouseResult.categories.performance.score;
        // this._cumulativeLayoutShift = this.formatTime(this._report.data.lighthouseResult.audits["cumulative-layout-shift"].numericValue);
    }

    // get performance() {
    //     return this._performance;
    // }
    // private secondtoMs(time: number){
    //     const milliS = (time * 1000);
    //     return milliS;
    // }

    // private formattedTime(time: number){
    //     const formattedTime = ();
    //     return formattedTime;
    // }

}

export const defineRequest = (url: string, strategy: string = 'mobile') => {
    const psiRequest = new PsiRequest(url, strategy)
    return psiRequest;
}

export const generateReport = async (psiRequest) => {
    const psiReport = await psiRequest.generateReport()
    return psiReport;
}

export const parseReport = (psiReport) => {
    const parsedReport = new ParsedReport(psiReport);
    return parsedReport;
}

const request = defineRequest('aws.chrisgonel.com');

// console.log(request.strategy)
// const report = await request.generateReport()
// const parsed = parseReport(report);
// console.log(parsed._url);
// console.log(parsed._performance);
// console.log(parsed._cumulativeLayoutShift)

