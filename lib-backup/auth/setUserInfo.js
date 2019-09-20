"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericApiCall_1 = require("../tools/genericApiCall");
// import {loginUser} from './loginUser'
exports.fs = require('fs-extra');
async function setUserInfo(userInfo) {
    const stackDirectory = `${genericApiCall_1.stacksDirectory}/${userInfo.stack}`;
    const userFile = `${stackDirectory}/${userInfo.name}.json`;
    try {
        await exports.fs.outputJson(userFile, userInfo);
        // console.log('in setUserInfo.  user file updated.')
    }
    catch (err) {
        console.error(err);
    }
}
exports.setUserInfo = setUserInfo;
