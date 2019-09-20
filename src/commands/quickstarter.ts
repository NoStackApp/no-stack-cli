import {Command, flags} from '@oclif/command'

import {createNoStackApp} from '../apps/createNoStackApp'
import {generateAppCode} from '../codeGeneration/generateAppCode'
import {UserInfo} from '../constants/types'
import {buildStackFromTemplate} from '../stacks/buildStackFromTemplate'
// import {createModerator} from '../stacks/createModerator'
import {createStackAndModerator} from '../stacks/create-stack-and-moderator'
import {errorMessage} from '../tools/errorMessage'
// import {createStackQuery} from '../stacks/create-stack-query'
// import {createModerator} from '../stacks/createModerator'
import {isRequired} from '../tools/isRequired'
// import {loginUser} from '../auth/loginUser'

const fs = require('fs-extra')
const Listr = require('listr')

export default class Quickstarter extends Command {
  static description = 'Creates a new moderator and stack.  Also logs in the moderator locally.'

  static examples = [
    '$ nostack quickstarter -u franky -s tempstack, -e franky@gmail.com -w franky12$',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    appName: flags.string({char: 'a', description: 'name of application'}),
    stack: flags.string({char: 's', description: 'stack'}),
    template: flags.string({char: 't', description: 'template from which to spin up a stack'}),
    licenseId: flags.string({char: 'l', description: 'license id for the organization of the user'}),
    user: flags.string({char: 'u', description: 'moderator to create'}),
    email: flags.string({char: 'e', description: 'moderator email'}),
    password: flags.string({char: 'w', description: 'moderator password'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(Quickstarter)
    const appName = flags.appName || isRequired('appName')
    const stack = flags.stack || isRequired('stack')
    const template = flags.template || isRequired('template')
    const user = flags.user || isRequired('user')
    const password = flags.password || isRequired('password')
    const email = flags.email || isRequired('email')
    const licenseId = flags.licenseId || isRequired('licenseId')

    let userInfo: UserInfo = {
      name: user,
      stack,
      password,
      email,
      licenseId,
      stackId: '',
      refreshToken: '',
      accessToken: '',
      id: '',
    }

    // console.log(`userInfo:${JSON.stringify(userInfo)}`)

    const newAppTasks = await createNoStackApp(appName)
    const newStackTasks = await createStackAndModerator(userInfo)
    const generateAppTasks = await generateAppCode(appName)

    // @ts-ignore
    const tasks = new Listr([
      {
        title: 'Create a Placeholder NoStack App',
        task: async () => newAppTasks
      },
      {
        title: 'Create an Empty Stack',
        task: async () => newStackTasks
      },
      {
        title: 'Build Stack from Template',
        task: async () => {
          // const json = await buildStackFromTemplate_1.buildStackFromTemplate(template, userInfo, email, addedSuffix);
          // await fs.outputJson(`${appName}/stack.json`, JSON.parse(json), (err) => {
          //   if (err) {
          //     // @ts-ignore
          //     throw new Error(console.error(err));
          //   }
          // });
          //
          const json = await buildStackFromTemplate(template, userInfo, email, '')
          const stackFile = `${appName}/stack.json`
          await fs.outputJson(stackFile, JSON.parse(json))

          const isStackFile = await fs.pathExists(stackFile)

          if (!isStackFile) {
            throw new Error(errorMessage('stack file was not generated on the front end.'))
          }

        }
      },
      {
        title: 'Generate Front End Code',
        task: async () => generateAppTasks,
      },
      // const json = await buildStackFromTemplate(template, userInfo, email, addedSuffix)
    ])

    await tasks.run().catch((err: any) => {
      console.error(err)
    })

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
