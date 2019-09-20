"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveServer = 'https://api.matchlynx.com/graphql';
exports.associationTypes = {
    MULTIPLE: 'multiple',
    SINGLE_REQUIRED: 'singleRequired',
};
exports.dataTypes = {
    STRING: 'string',
    BOOLEAN: 'boolean',
};
exports.boilerPlateTypes = {
    CREATION: 'creation',
    MULTIPLE_STRING: `${exports.associationTypes.MULTIPLE}${exports.dataTypes.STRING}`,
    MULTIPLE_ROOT: `${exports.associationTypes.MULTIPLE}${exports.dataTypes.STRING}Root`,
    SINGLE_STRING: `${exports.associationTypes.SINGLE_REQUIRED}${exports.dataTypes.STRING}`,
    SINGLE_BOOLEAN: `${exports.associationTypes.SINGLE_REQUIRED}${exports.dataTypes.BOOLEAN}`,
};
exports.boilerPlates = {
    [exports.boilerPlateTypes.CREATION]: 'genericCreationForm',
    [exports.boilerPlateTypes.MULTIPLE_STRING]: 'genericPluralNonRoot',
    [exports.boilerPlateTypes.MULTIPLE_ROOT]: 'genericPlural',
    [exports.boilerPlateTypes.SINGLE_STRING]: 'genericSingularString',
    [exports.boilerPlateTypes.SINGLE_BOOLEAN]: 'genericSingularBoolean',
};
exports.boilerplateDir = `${__dirname}/../../resources/boilerplates`;
// console.log(`boilerplateDir =${boilerplateDir}`)
