"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericApiCall_1 = require("../tools/genericApiCall");
const loginUser_1 = require("./loginUser");
function userFilePath(userName, stack) {
    return `${genericApiCall_1.stacksDirectory}/${stack}/${userName}.json`;
}
exports.userFilePath = userFilePath;
async function getUserInfo(userInfo) {
    // const stackDirectory = `${stacksDirectory}/${userInfo.stack}`
    const userFile = userFilePath(userInfo.name, userInfo.stack);
    // console.log('stackDirectory=', stackDirectory)
    try {
        userInfo = await genericApiCall_1.fs.readJson(userFile);
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            await loginUser_1.loginUser(userInfo);
            try {
                await genericApiCall_1.fs.outputJson(userFile, userInfo); // second try
            }
            catch (err) {
                console.error(err);
            }
        }
        else {
            console.error(err);
        }
    }
    // console.log(`in getUserInfo, userInfo:${JSON.stringify(userInfo)}`)
    return userInfo;
}
exports.getUserInfo = getUserInfo;
