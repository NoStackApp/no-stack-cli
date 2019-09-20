"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const constants_1 = require("../constants");
require('dotenv').config({ path: __dirname + '/./../.env' });
const isDev = process.env.NODE_ENV === 'development';
// console.log(`process.env.LOCAL_SERVER=${process.env.LOCAL_SERVER}`)
const server = isDev ? process.env.LOCAL_SERVER : constants_1.liveServer;
// console.log(`server=${server}`)
async function refreshAccessToken(userInfo) {
    const REFRESH_ACTION_ID = '9039e9c4-5b88-4575-8ed4-1fa1b27dc7a7';
    const executionParameters = {
        refreshToken: userInfo.refreshToken,
        platformId: userInfo.stackId
    };
    const embeddableExecutionParameters = JSON.stringify(executionParameters).replace(/"/g, '\\"');
    // console.log('embeddableExecutionParameters=', embeddableExecutionParameters)
    const query = `mutation {
        ExecuteAction(actionId: "${REFRESH_ACTION_ID}",
        executionParameters: "${embeddableExecutionParameters}",
        unrestricted: true)
      }
  `;
    const client = new graphql_request_1.GraphQLClient(server, {
        headers: {}
    });
    // console.log('query=', query)
    userInfo.accessToken = await client.request(query).then(data => {
        // console.log(data)
        const ExecuteAction = JSON.parse(data.ExecuteAction); // .AuthenticationResult // AccessToken
        return (ExecuteAction.AuthenticationResult.AccessToken);
        // console.log(`newAccessToken=${newAccessToken}`)
    })
        .catch(err => {
        console.log(err);
        // console.log(err.response.errors) // GraphQL response errors
        // console.log(err.response.data) // Response data if available
    });
}
exports.refreshAccessToken = refreshAccessToken;
