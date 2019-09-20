import {UserInfo} from '../constants/types'
import {genericApiCall} from '../tools/genericApiCall'
// const chalk = require('chalk')

export async function createModerator(userInfo: UserInfo) {
  // console.log(`options=${JSON.stringify(userInfo)}`)
  const query = `mutation {
      CreateModerator(name: "${userInfo.name}", password: "${userInfo.password}", email: "${userInfo.email}", licenseId: "${userInfo.licenseId}") {
          id,
          noStackId,
          name
      }
  }

  `
  // console.log(`query=${query}`)

  const returnedData = await genericApiCall(query, userInfo)
  // console.log(chalk.red('moderatorInfo') + `=${JSON.stringify(returnedData)}`)
  userInfo.id = returnedData.CreateModerator.id
}
