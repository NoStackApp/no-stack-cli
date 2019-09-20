"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericApiCall_1 = require("../tools/genericApiCall");
// const chalk = require('chalk')
async function createModerator(userInfo) {
    // console.log(`options=${JSON.stringify(userInfo)}`)
    const query = `mutation {
      CreateModerator(name: "${userInfo.name}", password: "${userInfo.password}", email: "${userInfo.email}", licenseId: "${userInfo.licenseId}") {
          id,
          noStackId,
          name
      }
  }

  `;
    // console.log(`query=${query}`)
    const returnedData = await genericApiCall_1.genericApiCall(query, userInfo);
    // console.log(chalk.red('moderatorInfo') + `=${JSON.stringify(returnedData)}`)
    userInfo.id = returnedData.CreateModerator.id;
}
exports.createModerator = createModerator;
