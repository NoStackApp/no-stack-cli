"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericApiCall_1 = require("../tools/genericApiCall");
const fs = require('fs-extra');
async function buildStackFromTemplate(templateFile, userInfo, sampleEmail, addedSuffix) {
    // console.log(`in buildStackFromTemplate, userInfo:${JSON.stringify(userInfo)}`)
    let templateString = '';
    try {
        templateString = await fs.readFile(templateFile, 'utf8');
    }
    catch (err) {
        console.error(err);
    }
    const query = `mutation {
      BuildStackFromTemplate(template: "${templateString.replace(/\n/g, '\\n')}", platformId:"${userInfo.stackId}", sampleEmail: "${sampleEmail}", addedSuffix: "${addedSuffix}")
  }
  `;
    const returnedData = await genericApiCall_1.genericApiCall(query, userInfo);
    // console.log(`returnedData=${JSON.stringify(returnedData)}`)
    return returnedData.BuildStackFromTemplate;
}
exports.buildStackFromTemplate = buildStackFromTemplate;
