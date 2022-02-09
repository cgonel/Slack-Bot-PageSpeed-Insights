import dotenv from 'dotenv';
import psi from 'psi'; 

dotenv.config();

export class PsiRequest {
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
        return psiReport;
    }
}

export class ParsedReport {
    private _report;
    public _url: string;
    public _performance: number;
    public _cumulativeLayoutShift: string;
    public _firstContentfulPaint: string;
    public _largestContentfulPaint: string;
    public _speedIndex: string;
    public _timeToInteractive: string;
    public _totalBlockingTime: string;

    constructor(report){
        this._report = report;
        this._url =  this._report.data.lighthouseResult.requestedUrl;
        this._performance = this._report.data.lighthouseResult.categories.performance.score * 100;
        this._speedIndex = this._report.data.lighthouseResult.audits["speed-index"].displayValue;
        this._timeToInteractive = this._report.data.lighthouseResult.audits.interactive.displayValue;
        this._totalBlockingTime = this._report.data.lighthouseResult.audits["total-blocking-time"].displayValue;
        this._cumulativeLayoutShift = this._report.data.lighthouseResult.audits["cumulative-layout-shift"].displayValue;
        this._largestContentfulPaint = this._report.data.lighthouseResult.audits["largest-contentful-paint"].displayValue;
        this._firstContentfulPaint = this._report.data.lighthouseResult.audits["first-contentful-paint"].displayValue;
    }
}