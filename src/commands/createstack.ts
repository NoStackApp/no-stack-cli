import {Command, flags} from '@oclif/command'
// import {createNoStackApp} from '../apps/createNoStackApp'

import {UserInfo} from '../constants/types'
// import {createModerator} from '../stacks/createModerator'
import {createStackAndModerator} from '../stacks/create-stack-and-moderator'
import {isRequired} from '../tools/isRequired'

export default class Createstack extends Command {
  static description = 'Creates a new moderator and stack.  Also logs in the moderator locally.'

  static examples = [
    '$ nostack createStack -u franky -s tempstack, -e franky@gmail.com -w franky12$',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    // appName: flags.string({char: 'a', description: 'name of application'}),
    stack: flags.string({char: 's', description: 'stack'}),
    licenseId: flags.string({char: 'l', description: 'license id for the organization of the user'}),
    user: flags.string({char: 'u', description: 'moderator to create'}),
    email: flags.string({char: 'e', description: 'moderator email'}),
    password: flags.string({char: 'w', description: 'moderator password'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(Createstack)
    const stack = flags.stack || isRequired('stack')
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

    // await createStackAndModerator(userInfo)

    const newStackTasks = await createStackAndModerator(userInfo)
    await newStackTasks.run().catch((err: any) => {
      console.error(err)
    })

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
