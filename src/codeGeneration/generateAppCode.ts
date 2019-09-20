// import chalk from 'chalk'
// import {loginUser} from '../../auth/loginUser'
import {associationTypes, boilerPlateTypes} from '../constants'
import {StackInfo} from '../constants/types'

import {createConfigFile} from './createConfigFile'
import {createFragmentsFile} from './createFragmentsFile'
import {createHighestLevelFiles} from './createHighestLevelFiles'
import {createQueryFile} from './createQueryFile'
import {createTopProjectDirs, srcDir} from './createTopProjectDirs'
import {createTypeFile} from './createTypeFile'
// import {createStackQuery} from '../../stacks/create-stack-query'
// import {createModerator} from '../../stacks/createModerator'

const execa = require('execa')
const fs = require('fs-extra')
const Listr = require('listr')

async function generateCodeFiles(appName: string) {
  const currentStack: StackInfo = await fs.readJSON(`${appName}/stack.json`) // await generateJSON.bind(this)(template, appName)
  // console.log(`currentStack=${currentStack}`)
  await createTopProjectDirs(currentStack, appName)

  // const config = await createConfigFile(currentStack, appName)
  // console.log(config)
  const configText = await createConfigFile(currentStack, appName)
  // console.log(`configText=${configText}`)
  fs.outputFile(`${srcDir}/config/index.js`, configText)

  // const fs = require('fs-extra')
  // const currentStack: object = fs.readJsonSync('stack.json')

  // this.log(JSON.stringify(currentStack, null, 2))
  await createHighestLevelFiles(currentStack, appName)

  // const sourcePropsDir = `${appName}/src/source-props`
  await createFragmentsFile(currentStack)

  const sources = currentStack.sources
  //mapObject

  await Promise.all(Object.keys(sources).map(async source => {
    await createQueryFile(currentStack, source)
  }))

  await Promise.all(Object.keys(sources).map(
    async (source: string) => {
      // console.log(`source=${source}`)
      const types = sources[source].selections
      // console.log(`types=${JSON.stringify(types)}`)
      await Promise.all(types.map(
        async (type: string) => {
          const assnType = currentStack.types[type].sources[source].assnType
          const dataType = currentStack.types[type].dataType
          // console.log(`assnType=${assnType}`)

          await createTypeFile(type, source, associationTypes.SINGLE_REQUIRED + dataType, currentStack)

          if (assnType === associationTypes.MULTIPLE) {  // currently just string is supported
            await createTypeFile(type, source, boilerPlateTypes.CREATION, currentStack)
            const {selectionRoot} = currentStack.sources[source]
            // console.log(`about to createTypeFile for a Multiple.  type=${type}, selectionRoot=${selectionRoot}`)
            if (selectionRoot === type) await createTypeFile(type, source, boilerPlateTypes.MULTIPLE_ROOT, currentStack)
            else await createTypeFile(type, source, boilerPlateTypes.MULTIPLE_STRING, currentStack)
          }
        }
      ))
    }
  ))
}

export async function generateAppCode(appName: string) {
  const tasks = new Listr([
    {
      title: 'Generate the Code Files',
      task: async () => {
        await generateCodeFiles(appName)
      }
    },
    {
      title: 'Make First Git Commit',
      task: async () => {
        await execa(
          'git',
          ['-C', appName, 'add', '.']
        )
        await execa(
          'git',
          ['-C', appName, 'commit', '-m', 'First no-stack commit :tada']
        )
      },
    },
  ])

  return tasks

}
