export const liveServer = 'https://api.matchlynx.com/graphql'

export const associationTypes = {
  MULTIPLE: 'multiple',
  SINGLE_REQUIRED: 'singleRequired',
}

export const dataTypes = {
  STRING: 'string',
  BOOLEAN: 'boolean',
}

export const boilerPlateTypes = {
  CREATION: 'creation',
  MULTIPLE_STRING: `${associationTypes.MULTIPLE}${dataTypes.STRING}`,
  MULTIPLE_ROOT: `${associationTypes.MULTIPLE}${dataTypes.STRING}Root`,
  SINGLE_STRING: `${associationTypes.SINGLE_REQUIRED}${dataTypes.STRING}`,
  SINGLE_BOOLEAN: `${associationTypes.SINGLE_REQUIRED}${dataTypes.BOOLEAN}`,
}

export const boilerPlates = {
  [boilerPlateTypes.CREATION]: 'genericCreationForm',
  [boilerPlateTypes.MULTIPLE_STRING]: 'genericPluralNonRoot',
  [boilerPlateTypes.MULTIPLE_ROOT]: 'genericPlural',
  [boilerPlateTypes.SINGLE_STRING]: 'genericSingularString',
  [boilerPlateTypes.SINGLE_BOOLEAN]: 'genericSingularBoolean',
}

export const boilerplateDir = `${__dirname}/../../resources/boilerplates`
// console.log(`boilerplateDir =${boilerplateDir}`)
