const fs = require('fs-extra')

import {StackInfo} from '../constants/types'
import {allCaps, singularName} from '../tools/inflections'

import {sourcePropsDir} from './createTopProjectDirs'

export async function createFragmentsFile(currentStack: StackInfo) {
  // console.log('in createFragmentsFile')

  let fragmentsContent = "import gql from 'graphql-tag';"

  Object.keys(currentStack.types).map(
    key => {
      fragmentsContent += `

export const ${allCaps(key)}_FRAGMENT = gql\`
  fragment ${singularName(key)}Parts on Instance {
    id
    value
  }
\`;`
    }
  )

  const fragmentsFile = sourcePropsDir + '/fragments.js'
  try {
    await fs.outputFile(fragmentsFile, fragmentsContent)
  } catch (err) {
    console.error(err)
  }

}
