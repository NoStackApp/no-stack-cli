"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericApiCall_1 = require("./genericApiCall");
const fs = require('fs-extra');
async function callApiHelper(queryFile, userInfo, variablesFile) {
    const query = await fs.readFile(queryFile, 'utf8');
    const variables = await fs.readJson(variablesFile);
    // console.log(`in callApiHelper,  variables=${JSON.stringify(variables)}`)
    // console.log(`in callApiHelper,  userInfo=${JSON.stringify(userInfo, null, 2)}`)
    // const query = 'query platformInfoForShechunot { platformInfo (platformId: "us-west-2_m5JX5p7P0") }'
    return genericApiCall_1.genericApiCall(query, userInfo, variables);
}
exports.callApiHelper = callApiHelper;
