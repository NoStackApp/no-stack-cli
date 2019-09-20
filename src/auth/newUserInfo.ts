import {UserInfo} from '../constants/types'

export const newUserInfo = (name: string): UserInfo => {
  return {
    name,
    stack: '',
    password: '',
    email: '',
    stackId: '',
    refreshToken: '',
    accessToken: '',
    id: '',
    licenseId: '',
  }
}
