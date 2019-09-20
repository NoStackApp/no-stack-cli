import {GraphQLClient} from 'graphql-request'

import {secureDirectory} from '../auth/config'
import {refreshAccessToken} from '../auth/refreshAccessToken'
import {setUserInfo} from '../auth/setUserInfo'
import {liveServer} from '../constants'
import {UserInfo} from '../constants/types'

export const fs = require('fs-extra')
require('dotenv').config({path: __dirname + '/./../../.env'})
// console.log(`__dirname + '/./../.env'=${__dirname + '/./../../.env'}`)

const isDev = process.env.NODE_ENV === 'development'
// console.log(`isDev=${isDev}`)
// console.log(`process.env.LOCAL_SERVER=${process.env.LOCAL_SERVER}`)

const server: string = isDev ? process.env.LOCAL_SERVER as string : liveServer
// console.log(`in genericAPICall, server=${server}`)

// tslint:disable-next-line:no-http-string
// export const server = 'http://localhost:3000/graphql'
export const stacksDirectory = `${secureDirectory}/noStackInfo`

export async function genericApiCall(query: string, userInfo: UserInfo, variables: object = {}) {
  // console.log(`in genericAPICall, userInfo=${JSON.stringify(userInfo)}`)
  // console.log(`query=${query}`)

  const client = new GraphQLClient(server, {
    headers: {
      jwt: userInfo.accessToken
    }
  })

  let dataReturned: any = ''
  let finished = false
  await client.request(query, variables).then(data => {
    // console.log(`data=${JSON.stringify(data)}`)
    dataReturned = data
    finished = true
  })
    .catch(async err => {
      console.log(JSON.stringify(err))
      if (err.code === 103 || err.response.errors[0].code === 103) {
        console.log('***error 103 encountered... will refresh token again***') // GraphQL response errors
        // const user = options.user || isRequired('user')
        // const stack = options.stack || isRequired('stack')
        await refreshAccessToken(userInfo)
        await setUserInfo(userInfo)
        // refreshAccessTokenForUser(currentRefreshToken,user)
      } else {
        finished = true
        // console.log(err.response.errors) // GraphQL response errors
        console.log(JSON.stringify(err.response.data)) // Response data if available
        throw new Error(err.response.errors) // GraphQL response errors
      }
    })

  if (!finished) {
    console.log('trying again')
    const clientAfterRefresh = new GraphQLClient(server, {
      headers: {
        jwt: userInfo.accessToken
      }
    })
    await clientAfterRefresh.request(query, variables).then(data => {
      console.log(data)
      dataReturned = data
      finished = true
    })
      .catch(err => {
        console.log(JSON.stringify(err.response.data)) // Response data if available
        throw new Error(err.response.errors) // GraphQL response errors
      })
  }
  return dataReturned
}
