const fs = require('fs-extra')

// import {allCaps} from '../inflections'

import {StackInfo} from '../constants/types'
import {allCaps, queryForSource, relationshipsForSource} from '../tools/inflections'

import {sourcePropsDir} from './createTopProjectDirs'

// interface QueryTree {
//   [node: string]: QueryTree
// }
//
// interface VisitedList {
//   [node: string]: boolean,
// }
//
// function deriveTreeChildren(currentStack: StackInfo, source: string, visited: VisitedList, currentRoot: string) {
//   console.log(`in deriveTreeChildren(source: ${source}, currentRoot: ${currentRoot}`)
//
//   visited[currentRoot] = true
//   // console.log(`currentStack.types=${JSON.stringify(currentStack.types)}`)
//
//   const nodeInfo = currentStack.types[currentRoot].sources[source]
//   const potentialContiguousNodes = [
//     nodeInfo.parentType,
//     ...nodeInfo.children
//   ]
//   const contiguousSelectedNodes: string[] = []
//
//   let childrenObject: QueryTree = {}
//
//   while (potentialContiguousNodes.length > 0) {
//     const node = potentialContiguousNodes.pop()
//     if (node && !visited[node]) {
//       // @ts-ignore
//       if (currentStack.sources[source].selections.includes(node)) {
//         contiguousSelectedNodes.push(node)
//       } else {
//         visited[node] = true
//         const currentNodeInfo = currentStack.types[node].sources[source]
//         const potentialConnectedNodesForCurrentNode = [
//           currentNodeInfo.parentType,
//           ...currentNodeInfo.children
//         ]
//         potentialConnectedNodesForCurrentNode.map(nodeChild => {
//           if (nodeChild && nodeChild !== node) {
//             potentialContiguousNodes.push(nodeChild)
//           }
//         })
//       }
//     }
//   }
//   contiguousSelectedNodes.map(
//     node => {
//       childrenObject[node] = deriveTreeChildren(currentStack, source, visited, node)
//     }
//   )
//
//   if (childrenObject === {}) return {}
//   return childrenObject
// }
//
// function createQueryBody(queryTree: QueryTree, node: string, currentStack: StackInfo) {
//   const partsPhrase = `${singularName(node)}Parts`
//
//   if (Object.entries(queryTree).length > 0) {
//     let childrenParts: string[] = []
//     const children = queryTree[node]
//     Object.keys(children).map(
//       (child: string) => {
//         childrenParts.push(createQueryBody(children[child], child, currentStack))
//       }
//     )
//     // if (childrenTypeRelationships.length > 0) {
//     return `instance {
//         ...${partsPhrase}
//       }
//     children {
//           ${childrenParts.join(', ')}
//       }`
//     // }
//   }
//   return `instance {
//       ...${partsPhrase}
//     }`
//
// }

// function createTypeRelationships(queryTree: QueryTree, node: string, currentStack: StackInfo) {
//   const nodeConstant = currentStack.types[node].const
//   console.log(`in createTypeRelationships (node: ${node}, QueryTree: ${JSON.stringify(queryTree)}`)
//
//   if (Object.entries(queryTree).length > 0) {
//     let childrenTypeRelationships: string[] = []
//
//     const children = queryTree[node]
//     // console.log(`in createTypeRelationships (node: ${node}, children: ${JSON.stringify(children)}`)
//     Object.keys(children).map(
//       (child: string) => {
//         childrenTypeRelationships.push(createTypeRelationships(children[child], child, currentStack))
//       }
//     )
//     // if (childrenTypeRelationships.length > 0) {
//     return `[${nodeConstant}]: {
//         ${childrenTypeRelationships.join(', ')}
//     }`
//     // }
//   }
//   return `[${nodeConstant}]: null`
//
// }

export async function createQueryFile(currentStack: StackInfo, source: string) {
  // console.log(`in createQueryFile for currentStack.  source= ${source}`)
  const sourceInfo = currentStack.sources[source]

  let content = "import gql from 'graphql-tag';"

  // const selectionRoot = sourceInfo.selectionRoot
  // console.log(`selectionRoot= ${selectionRoot}`)

  // let queryTree: QueryTree = {
  //   [selectionRoot]: deriveTreeChildren(currentStack, source, {}, selectionRoot)
  // }
  //
  const queryName = queryForSource(source) // `${allCaps(source)}_QUERY`
  //
  // // console.log(`currentStack.sources[source]= ${JSON.stringify(currentStack.sources[source])}`)
  const selections: string[] = currentStack.sources[source].selections

  const queryConstsImport = '\n\nimport { ' + selections.map(selection => `${currentStack.types[selection].const}`).join(', ') + '} from \'../../config\';'
  content += queryConstsImport

  const queryFragmentsImport = '\n\nimport { ' + selections.map(selection => `${allCaps(selection)}_FRAGMENT`).join(', ') + '} from \'./fragments\';'
  content += queryFragmentsImport

  const queryFragmentsList = '\n' + selections.map(selection => `$\{${allCaps(selection)}_FRAGMENT\}`).join('\n')
  const queryBody = `\n\nexport const ${queryName} = gql\`
  query SOURCE(
    $id: ID!
    $typeRelationships: String!
    $parameters: String
  ) {
    sourceData(
      sourceId: $id
      typeRelationships: $typeRelationships
      parameters: $parameters
    ) {
      ${sourceInfo.props.queryBody}
    }
  }
  ${queryFragmentsList}
\`;
`

  // console.log(`sourceInfo.props=${JSON.stringify(sourceInfo.props, null, 2)}`)

  /*
  SAMPLE relationship tree...

  export const PROJECTS_FOR_CURRENT_USER_RELATIONSHIPS = {
  [TYPE_PROJECT_ID]: null,
};
   */
  content += `\n${queryBody}`
  // console.log(`content=${content}`)
//
// //
  const relationshipName = relationshipsForSource(source) // `${allCaps(source)}_RELATIONSHIP`
  const relationshipText = `export const ${relationshipName} = {
   ${sourceInfo.props.typeRelationships},
};`
//
  content += `${relationshipText}`
  // console.log(`content=${content}`)

  const queryFile = `${sourcePropsDir}/${source}.js`
  try {
    await fs.outputFile(queryFile, content)
  } catch (err) {
    console.error(err)
  }

}
