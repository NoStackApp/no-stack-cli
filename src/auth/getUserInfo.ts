import {UserInfo} from '../constants/types'
import {fs, stacksDirectory} from '../tools/genericApiCall'

import {loginUser} from './loginUser'

export function userFilePath(userName: string, stack: string) {
  return `${stacksDirectory}/${stack}/${userName}.json`
}

export async function getUserInfo(userInfo: UserInfo) {
  // const stackDirectory = `${stacksDirectory}/${userInfo.stack}`
  const userFile = userFilePath(userInfo.name, userInfo.stack)
  // console.log('stackDirectory=', stackDirectory)

  try {
    userInfo = await fs.readJson(userFile)
  } catch (err) {
    if (err.code === 'ENOENT') {
      await loginUser(userInfo)

      try {
        await fs.outputJson(userFile, userInfo) // second try
      } catch (err) {
        console.error(err)
      }

    } else {
      console.error(err)
    }

  }

  // console.log(`in getUserInfo, userInfo:${JSON.stringify(userInfo)}`)
  return userInfo
}
