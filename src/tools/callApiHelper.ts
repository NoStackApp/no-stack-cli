import {UserInfo} from '../constants/types'

import {genericApiCall} from './genericApiCall'

const fs = require('fs-extra')

export async function callApiHelper(queryFile: string, userInfo: UserInfo, variablesFile: string) {
  const query = await fs.readFile(queryFile, 'utf8')
  const variables = await fs.readJson(variablesFile)
  // console.log(`in callApiHelper,  variables=${JSON.stringify(variables)}`)
  // console.log(`in callApiHelper,  userInfo=${JSON.stringify(userInfo, null, 2)}`)
  // const query = 'query platformInfoForShechunot { platformInfo (platformId: "us-west-2_m5JX5p7P0") }'
  return genericApiCall(query, userInfo, variables)
}
