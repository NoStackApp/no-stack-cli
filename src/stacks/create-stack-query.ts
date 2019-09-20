import {UserInfo} from '../constants/types'
import {genericApiCall} from '../tools/genericApiCall'

export async function createStackQuery(userInfo: UserInfo) {
  // console.log(`userInfo=${JSON.stringify(userInfo)}`)

  const query = `mutation {
      CreatePlatform(owner: "${userInfo.id}", ownerPlatformPassword: "${userInfo.password}", name: "${userInfo.stack}", licenseId: "${userInfo.licenseId}") {
      id,
      name,
      clientId,
      moderators{id}
    }
   }
  `
  // console.log(`query=${query}`)

  const returnedData = await genericApiCall(query, userInfo)

  userInfo.stackId = returnedData.CreatePlatform.id
  userInfo.id = returnedData.CreatePlatform.moderators[0].id
  // console.log(`final userInfo=${JSON.stringify(userInfo)}`)

}
