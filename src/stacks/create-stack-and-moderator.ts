// import chalk from 'chalk'

// const execa = require('execa')
// const fs = require('fs-extra')
const Listr = require('listr')

import {loginUser} from '../auth/loginUser'
// import {setUserInfo} from '../auth/setUserInfo'
import {UserInfo} from '../constants/types'
// import {genericApiCall} from '../genericApiCall'

import {createStackQuery} from './create-stack-query'
import {createModerator} from './createModerator'

export async function createStackAndModerator(userInfo: UserInfo) {
  const tasks = new Listr([
    {
      title: 'Create the moderator account',
      task: async () => {
        await createModerator(userInfo)
      }
    },
    {
      title: 'Create the new stack',
      task: async () => {
        await createStackQuery(userInfo)
      }
    },
    {
      title: 'Log in the moderator',
      task: async () => {
        await loginUser(userInfo)
      }
    },
  ])

  return tasks

}
