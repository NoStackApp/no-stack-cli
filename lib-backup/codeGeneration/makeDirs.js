"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs-extra');
// const desiredMode = 0o2775
const options = {
    mode: 0o2775
};
async function makeDir(dirName) {
    try {
        await fs.ensureDir(dirName, options);
        // console.log('success creating dirs')
    }
    catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
    }
}
//
// const functionWithPromise = item => { //a function that returns a promise
//   return Promise.resolve('ok')
// }
//
// }
// const getData = async () => {
//   return await Promise.all(list.map(item => anAsyncFunction(item)))
// }
async function makeDirs(dirList) {
    await Promise.all(dirList.map(item => makeDir(item)));
}
exports.makeDirs = makeDirs;
