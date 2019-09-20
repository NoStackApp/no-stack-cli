import {UserInfo} from '../constants/types'
import {genericApiCall} from '../tools/genericApiCall'

const fs = require('fs-extra')

export async function buildStackFromTemplate(templateFile: string, userInfo: UserInfo, sampleEmail: string, addedSuffix: string) {
  // console.log(`in buildStackFromTemplate, userInfo:${JSON.stringify(userInfo)}`)
  let templateString = ''
  try {
    templateString = await fs.readFile(templateFile, 'utf8')

  } catch (err) {
    console.error(err)
  }

  const query = `mutation {
      BuildStackFromTemplate(template: "${templateString.replace(/\n/g, '\\n')}", platformId:"${userInfo.stackId}", sampleEmail: "${sampleEmail}", addedSuffix: "${addedSuffix}")
  }
  `

  const returnedData = await genericApiCall(query, userInfo)
  // console.log(`returnedData=${JSON.stringify(returnedData)}`)
  return returnedData.BuildStackFromTemplate
}
