"use strict";
// import {string} from '@oclif/command/lib/flags'
// import {Replacement} from 'tslint'
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const inflections_1 = require("../tools/inflections");
const createReplacementOptions_1 = require("./createReplacementOptions");
const createTopProjectDirs_1 = require("./createTopProjectDirs");
const generateFromBoilerPlate_1 = require("./generateFromBoilerPlate");
const makeDirs_1 = require("./makeDirs");
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
const boilerPlateToDir = (type, boilerPlateType) => {
    const mappingObject = {
        [constants_1.boilerPlateTypes.CREATION]: inflections_1.singularName(type) + 'CreationForm',
        [constants_1.boilerPlateTypes.SINGLE_BOOLEAN]: inflections_1.singularName(type),
        [constants_1.boilerPlateTypes.SINGLE_STRING]: inflections_1.singularName(type),
        [constants_1.boilerPlateTypes.MULTIPLE_STRING]: inflections_1.pluralName(type),
        [constants_1.boilerPlateTypes.MULTIPLE_ROOT]: inflections_1.pluralName(type),
    };
    return mappingObject[boilerPlateType];
};
async function createTypeFile(type, source, boilerPlateType, currentStack) {
    // console.log(`in createTypeFile, type=${type}, boilerPlate=${boilerPlateType}`)
    // const parentType = currentStack.types[type].sources[source].parentType
    const boilerPlate = constants_1.boilerPlates[boilerPlateType];
    const dir = boilerPlateToDir(type, boilerPlateType);
    // console.log(`in createTypeFile, dir=${dir}`)
    // if (boilerPlate !== boilerPlates[associationTypes.MULTIPLE]) {
    //   dir = singularName(type)
    // }
    const path = `${createTopProjectDirs_1.compDir}/${inflections_1.singularName(source)}/${dir}`;
    const dirList = [
        path
    ];
    const options = createReplacementOptions_1.createReplacementOptions(type, source, boilerPlate, currentStack);
    // console.log(`options is: ${JSON.stringify(options)}`)
    await makeDirs_1.makeDirs(dirList);
    try {
        await generateFromBoilerPlate_1.generateFromBoilerPlate(`${constants_1.boilerplateDir}/${boilerPlate}.js`, `${path}/index.js`, options);
        // console.log('success creating file')
    }
    catch (err) {
        console.error(err);
    }
}
exports.createTypeFile = createTypeFile;
