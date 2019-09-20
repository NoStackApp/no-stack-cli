// import {string} from '@oclif/command/lib/flags'
// import {Replacement} from 'tslint'

import {boilerplateDir, boilerPlates, boilerPlateTypes} from '../constants'
import {StackInfo} from '../constants/types'
import {pluralName, singularName} from '../tools/inflections'

import {createReplacementOptions, ReplacementOptions} from './createReplacementOptions'
import {compDir} from './createTopProjectDirs'
import {generateFromBoilerPlate} from './generateFromBoilerPlate'
import {makeDirs} from './makeDirs'

// interface DescendantInfo {
//   descendant: string,
//   associationType: string,
//   source: string,
// }
//
// const getDescendants = (type: string, source: string, currentStack: StackInfo, descendants: DescendantInfo[]) => {
//   let children = {...currentStack.sources[source].tree[type]}
//   const connectedSource: string = currentStack.sources[source].connections[type]
//
//   Object.keys(children).map(
//     child => {
//       descendants.push({
//         descendant: child,
//         associationType: children[child],
//         source,
//       })
//       getDescendants(child, source, currentStack, descendants)
//     }
//   )
//   if (connectedSource) getDescendants(type, connectedSource, currentStack, descendants)
//
// }

const boilerPlateToDir = (type: string, boilerPlateType: string) => {
  const mappingObject = {
    [boilerPlateTypes.CREATION]: singularName(type) + 'CreationForm',
    [boilerPlateTypes.SINGLE_BOOLEAN]: singularName(type),
    [boilerPlateTypes.SINGLE_STRING]: singularName(type),
    [boilerPlateTypes.MULTIPLE_STRING]: pluralName(type),
    [boilerPlateTypes.MULTIPLE_ROOT]: pluralName(type),
  }
  return mappingObject[boilerPlateType]
}

export async function createTypeFile(type: string, source: string, boilerPlateType: string, currentStack: StackInfo) {
  // console.log(`in createTypeFile, type=${type}, boilerPlate=${boilerPlateType}`)
  // const parentType = currentStack.types[type].sources[source].parentType
  const boilerPlate = boilerPlates[boilerPlateType]
  const dir = boilerPlateToDir(type, boilerPlateType)
  // console.log(`in createTypeFile, dir=${dir}`)
  // if (boilerPlate !== boilerPlates[associationTypes.MULTIPLE]) {
  //   dir = singularName(type)
  // }

  const path = `${compDir}/${singularName(source)}/${dir}`
  const dirList = [
    path
  ]

  const options: ReplacementOptions = createReplacementOptions(type, source, boilerPlate, currentStack)

  // console.log(`options is: ${JSON.stringify(options)}`)
  await makeDirs(dirList)

  try {
    await generateFromBoilerPlate(`${boilerplateDir}/${boilerPlate}.js`, `${path}/index.js`, options)
    // console.log('success creating file')
  } catch (err) {
    console.error(err)
  }
}
