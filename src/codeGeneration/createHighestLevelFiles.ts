import {noNameError} from '../commands/makecode'
import {associationTypes, boilerplateDir} from '../constants'
import {StackInfo} from '../constants/types'
import {pluralName, singularName} from '../tools/inflections'

import {appDir, compDir, srcDir} from './createTopProjectDirs'
import {generateFromBoilerPlate} from './generateFromBoilerPlate'

const fs = require('fs-extra')

export async function createHighestLevelFiles(currentStack: StackInfo, appName: string) {
  // const boilerPlateDir = `${boilerplateDir}/codeGeneration/boilerplates`

  // shell.cp()

  // NavBar
  let options = {
    files: '',
    from: [
      /__AppName__/g
    ],
    to: [
      appName
    ]
  }

  await fs.outputJson(`${appDir}/docs/stack.json`, currentStack, (err: any) => {
    if (err) {
      // @ts-ignore
      throw new Error(console.error(err))
    }
  })

  await generateFromBoilerPlate(`${boilerplateDir}/NavBar.js`, `${compDir}/NavBar/index.js`, options)

  // client file
  await fs.copy(`${boilerplateDir}/client.js`, `${srcDir}/client/index.js`)

  // flattenData file
  await fs.copy(`${boilerplateDir}/flattenData.js`, `${srcDir}/flattenData/index.js`)

  // index.js
  await fs.copy(`${boilerplateDir}/index.js`, `${srcDir}/index.js`)

  // App
  const source: string = currentStack.topSource
  if (!source) {
    const err = (new noNameError())
    err.message = 'template contains no sources'
    throw(err)
  }

  const topComponentType: string = currentStack.sources[source].selectionRoot
  if (!topComponentType) {
    const err = (new noNameError())
    err.message = `source ${source} contains no selected items`
    throw(err)
  }

  let topComponent = pluralName(topComponentType)

  if (currentStack.types[topComponentType].sources[source].assnType === associationTypes.SINGLE_REQUIRED) {
    topComponent = singularName(topComponentType)
  }

  let topComponentSetting = 'userId={ currentUser.id }'

  /*
"constraints": {"toDoSource":
 {"constraintType": "ID", "type": "project", "value": "currentProjectId"}},

   loop and for every constraint:
   if value=__currentUser__
      topComponentSetting += ' userId={ currentUser.id }'
    if type==="ID"

      topComponentSetting += ' ${type}Id={ ${value} }'
    else
      topComponentSetting += ' ${type}Value={ ${value} }'
   */
  options = {
    files: '',
    from: [
      /__SourceName__/g,
      /__TopComponentName__/g,
      /__TopComponentPropSetting__/g,
    ],
    to: [
      singularName(source),
      topComponent,
      topComponentSetting,
    ]
  }

  await generateFromBoilerPlate(`${boilerplateDir}/App.js`, `${srcDir}/App.js`, options)

  // config
  // const configText = await createConfigFile(currentStack, appName)
  // // console.log(`configText=${configText}`)
  // fs.outputFile(`${srcDir}/config/index.js`, configText)

  // options = {files: '', from: [], to: []}
  // await generateFromBoilerPlate(`${boilerplateDir}/config.js`, `${srcDir}/config/index.js`, options)
}
