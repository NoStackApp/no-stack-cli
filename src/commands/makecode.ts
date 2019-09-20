const errorEx = require('error-ex')

import {Command, flags} from '@oclif/command'

import {generateAppCode} from '../codeGeneration/generateAppCode'

export const noNameError = errorEx('noNameError')

export default class Makecode extends Command {
  static description = 'generates a starter app from a json provided by NoStack'

  static flags = {
    // template: flags.string({char: 't', description: 'template file'}),
    appName: flags.string({char: 'a', description: 'application name'}),
    help: flags.help({char: 'h'}),
    force: flags.boolean({char: 'f'}),
  }

  static args = []

  async run() {
    // const {args, flags} = this.parse(Makecode)
    const {flags} = this.parse(Makecode)

    // const template = flags.template || ''
    const appName = flags.appName || ''

    if (appName === '') {
      this.log("no application name provided.  You must specify an app name with the flag '-a' or '-appName'")
      return
    }

    const generateAppTasks = await generateAppCode(appName)
    await generateAppTasks.run().catch((err: any) => {
      console.error(err)
    })
  }
}
