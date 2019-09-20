import {GraphQLClient} from 'graphql-request'

import {liveServer} from '../constants'
import {UserInfo} from '../constants/types'

import {setUserInfo} from './setUserInfo'

require('dotenv').config({path: __dirname + '/./../.env'})

const prompts = require('prompts')

const isDev = process.env.NODE_ENV === 'development'
// console.log(`process.env.LOCAL_SERVER=${process.env.LOCAL_SERVER}`)

const server: string = isDev ? process.env.LOCAL_SERVER as string : liveServer
// console.log(`server=${server}`)

export async function loginUser(userInfo: UserInfo) {
  const LOGIN_ACTION_ID = 'fe1c52df-9efc-4432-bbd0-7dc411cb8ed8'
  // '{userName: $un, password: $pw, platformId: $pid}' )

  let response = {
    password: '',
    stackId: ''
  }

  if (!userInfo.password) {
    response = await prompts({
      type: 'text',
      name: 'password',
      message: `User ${userInfo.name} is not logged in. What is their password?`
    })
    userInfo.password = response.password
  }

  if (!userInfo.stackId) {
    response = await prompts({
      type: 'text',
      name: 'stackId',
      message: `What is the stack id for ${userInfo.stack}?`
    })
    userInfo.stackId = response.stackId
  }
  const executionParameters = {
    userName: userInfo.name,
    password: userInfo.password,
    platformId: userInfo.stackId
  }
  const embeddableExecutionParameters = JSON.stringify(executionParameters).replace(/"/g, '\\"')
  // console.log('embeddableExecutionParameters=', embeddableExecutionParameters)
  const query = `mutation {
        ExecuteAction(actionId: "${LOGIN_ACTION_ID}",
        executionParameters: "${embeddableExecutionParameters}",
        unrestricted: true)
      }
  `
  const client = new GraphQLClient(server, {
    headers: {}
  })

  // console.log('query=', query)
  await client.request(query).then(async data => {
    // console.log(data)
    const ExecuteAction = JSON.parse(data.ExecuteAction)  // .AuthenticationResult // AccessToken
    userInfo.accessToken = ExecuteAction.AuthenticationResult.AccessToken
    userInfo.refreshToken = ExecuteAction.AuthenticationResult.RefreshToken

    // console.log(`userInfo=${JSON.stringify(userInfo)}`)
    await setUserInfo(userInfo)

    // console.log(`newAccessToken=${newAccessToken}`)
  })
    .catch(err => {
      // console.log(err.response.errors) // GraphQL response errors
      // console.log(err.response.data) // Response data if available
      throw new Error(err)
    })

  /*
  EXECUTE_ACTION_OUTPUT="$(echo ${RESULTS_OBJECT} | npx jq -r '.data.ExecuteAction  | fromjson')"
#echo "EXECUTE_ACTION_OUTPUT: ${EXECUTE_ACTION_OUTPUT}"

CURRENT_ACCESS_TOKEN="$(echo ${EXECUTE_ACTION_OUTPUT} | npx jq -r '.AuthenticationResult.AccessToken')"
CURRENT_REFRESH_TOKEN="$(echo ${EXECUTE_ACTION_OUTPUT} | npx jq -r '.AuthenticationResult.RefreshToken')"
#echo "new CURRENT_REFRESH_TOKEN: ${CURRENT_REFRESH_TOKEN}"

   */
}
