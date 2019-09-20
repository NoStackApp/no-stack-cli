// import {appDir} from './commands/makecode'
import {allCaps} from './inflections'

const fs = require('fs-extra') // @ts-ignore
// const pify = require('pify')
const byline = require('byline')
const errorEx = require('error-ex')
const pluralize = require('pluralize')
const inflection = require('inflection')
const noNameError = errorEx('noNameError')

// let templateFile = ''

const stack = {
  userClasses: {} as object,
  sources: {} as object,
  types: {} as object,
  actions: {} as object,
  topSource: null as unknown as string,
}

const newUserClass = (args: any[]) => {
  // console.log('args[0]=',args[0])
  const name = args[0]
  if (!name) {
    const err = (new noNameError())
    err.message = 'newUserClass without a name in the template'
    throw(err)
  }

  // var obj = {
  //   property: <string> null
  // };

  // @ts-ignore
  stack.userClasses[name] = {
    name,
  }

  // @ts-ignore
  stack.types[name] = {
    const: `TYPE_${allCaps(name)}_ID`,
    name,
    plural: pluralize(name),
    sources: {},
  }
  // console.log(`stack.userClasses=${JSON.stringify(stack.userClasses)}`)
}

const newSource = (args: any[]) => {
  const name = args[0]
  // @ts-ignore
  stack.sources[name] = {
    const: `SOURCE_${allCaps(name)}_ID`,
    name,
    tree: {},
    selections: [],
    constraints: {},
    connections: {},
    owner: args[1],
    selectionRoot: null as unknown as string,
  }
  if (!stack.topSource) {
    stack.topSource = name
  }
  // stack.sources[args[0]].name = args[0]
  // console.log(`stack.sources=${JSON.stringify(stack.sources)}`)
}

const newType = (args: string[]) => {
  const name = args[0]
  const source = args[1]
  const parentType = args[2]
  const dataType = args[3] || 'string'
  const assnType = args[4] || 'multiple'

  // @ts-ignore
  stack.types[name] = {
    const: `TYPE_${allCaps(name)}_ID`,
    dataType,
    name,
    plural: pluralize(name),
    sources: {
      [source]: {
        // @ts-ignore
        id: stack.sources[source].id,
        parentType,
        assnType,
        children: [],
      },
    },
  }
  if (assnType === 'multiple') {
    // @ts-ignore
    stack.types[name].sources[source].plural = inflection.camelize(pluralize(name), false) as string
  }

  // @ts-ignore
  if (Object.keys(stack.sources[source].tree).length === 0 && stack.sources[source].tree.constructor === Object) {
    // this is the first type to be added to the tree, which means that the parent type has not yet been
    // added...
    // @ts-ignore
    stack.sources[source].root = parentType
    // @ts-ignore
    stack.sources[source].tree[parentType] = {}
    // @ts-ignore
    stack.types[parentType].sources[source] = {
      // @ts-ignore
      id: stack.sources[source].id,
      parentType: '',
      assnType: '',
      children: [],
    }
  }

  // console.log(`stack.sources[source].tree[parentType] = ${JSON.stringify(stack.sources[source].tree[parentType])}`)
  // @ts-ignore
  if (!stack.sources[source].tree[parentType]) {
    // tslint:disable-next-line:no-console
    console.error(`Problem in the template in the declaration of new type ${name} in the source ${source}:
    the parent ${parentType} is not already in the source`)
    return
  }

  // @ts-ignore
  stack.sources[source].tree[parentType][name] = assnType
  // @ts-ignore
  stack.types[parentType].sources[source].children.push(name)
  // @ts-ignore
  stack.sources[source].tree[name] = {}

  // create actions
  // @ts-ignore
  stack.actions[`${source}__${name}_create`] = {
    const: `CREATE_${allCaps(name)}_FOR_${allCaps(source)}_ACTION_ID`,
    type: name,
    source,
    parentType,
  }
  // @ts-ignore
  stack.actions[`${source}__${name}_update`] = {
    const: `CREATE_${allCaps(name)}_FOR_${allCaps(source)}_ACTION_ID`,
    type: name,
    source,
  }
  // @ts-ignore
  stack.actions[`${source}__${name}_delete`] = {
    const: `DELETE_${allCaps(name)}_FOR_${allCaps(source)}_ACTION_ID`,
    type: name,
    source,
  }
}

const newSelection = (args: string[]) => {
  // console.log('running newSelection, args=', args)
  // @ts-ignore
  stack.sources[args[0]].selections.push(args[1])
  // @ts-ignore
  if (!stack.sources[args[0]].selectionRoot) {
    // @ts-ignore
    stack.sources[args[0]].selectionRoot = args[1]
  }
}

const newConstraint = (args: string[]) => {
  // @ts-ignore
  stack.sources[args[1]].constraints[args[0]] = {
    constraintType: args[3],
    type: args[2],
    value: args[0],
  }
}

const connectSources = (args: string[]) => {
  const childSource = args[0]
  const parentSource = args[1]
  const connectingType = args[2]

  // @ts-ignore
  stack.sources[parentSource].connections[connectingType] = childSource
}

const updateData = (command: string, args: string[]) => {
  const commands = {
    newUserClass,
    newSource,
    newType,
    newSelection,
    newConstraint,
    connectSources,
  }

  // @ts-ignore
  if (commands[command]) {
    // @ts-ignore
    return commands[command](args)
  }
}

export async function generateJSON(template: string, appDir: string) {
  let stream = byline(fs.createReadStream(template, {encoding: 'utf8'}))
  let firstWord = ''
  let rest = []

  stream.on('data', function (line: { replace(arg0: RegExp, arg1: string): { split(arg0: string): any[];
    split(s: string): any[]
  }}) {
    rest = line.replace(/\s\s+/g, ' ').split(' ')
    firstWord = rest.shift()
    updateData(firstWord, rest)
  })

  const streamResult: object = new Promise((resolve, reject) => {
    stream.on('end', async function () {
      await fs.outputJson(`${appDir}/stack.json`, stack, (err: any) => {
        if (err) {
          // @ts-ignore
          reject(console.error(err))
        }
      })

      resolve(stack)
    })
  })

  const stackReturned: object = await streamResult
  return stackReturned
}
