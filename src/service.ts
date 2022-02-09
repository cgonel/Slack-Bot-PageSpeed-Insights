import * as classes from './classes.js';

export const parseInput = (input: string) : string[] => {
    const splitInput = input.split("--strategy");
    splitInput[1] = splitInput[1].trim()

    return splitInput;
}

export const defineRequest = (url: string, strategy: string = 'mobile') => {
    const psiRequest = new classes.PsiRequest(url, strategy)
    return psiRequest;
}

export const generateReport = async (psiRequest) => {
    const psiReport = await psiRequest.generateReport()
    return psiReport;
}

export const parseReport = (psiReport) => {
    const parsedReport = new classes.ParsedReport(psiReport);
    return parsedReport;
}
