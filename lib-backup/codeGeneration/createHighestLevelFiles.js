"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const makecode_1 = require("../commands/makecode");
const constants_1 = require("../constants");
const inflections_1 = require("../tools/inflections");
const createTopProjectDirs_1 = require("./createTopProjectDirs");
const generateFromBoilerPlate_1 = require("./generateFromBoilerPlate");
const fs = require('fs-extra');
async function createHighestLevelFiles(currentStack, appName) {
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
    };
    await fs.outputJson(`${createTopProjectDirs_1.appDir}/docs/stack.json`, currentStack, (err) => {
        if (err) {
            // @ts-ignore
            throw new Error(console.error(err));
        }
    });
    await generateFromBoilerPlate_1.generateFromBoilerPlate(`${constants_1.boilerplateDir}/NavBar.js`, `${createTopProjectDirs_1.compDir}/NavBar/index.js`, options);
    // client file
    await fs.copy(`${constants_1.boilerplateDir}/client.js`, `${createTopProjectDirs_1.srcDir}/client/index.js`);
    // flattenData file
    await fs.copy(`${constants_1.boilerplateDir}/flattenData.js`, `${createTopProjectDirs_1.srcDir}/flattenData/index.js`);
    // index.js
    await fs.copy(`${constants_1.boilerplateDir}/index.js`, `${createTopProjectDirs_1.srcDir}/index.js`);
    // App
    const source = currentStack.topSource;
    if (!source) {
        const err = (new makecode_1.noNameError());
        err.message = 'template contains no sources';
        throw (err);
    }
    const topComponentType = currentStack.sources[source].selectionRoot;
    if (!topComponentType) {
        const err = (new makecode_1.noNameError());
        err.message = `source ${source} contains no selected items`;
        throw (err);
    }
    let topComponent = inflections_1.pluralName(topComponentType);
    if (currentStack.types[topComponentType].sources[source].assnType === constants_1.associationTypes.SINGLE_REQUIRED) {
        topComponent = inflections_1.singularName(topComponentType);
    }
    let topComponentSetting = 'userId={ currentUser.id }';
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
            inflections_1.singularName(source),
            topComponent,
            topComponentSetting,
        ]
    };
    await generateFromBoilerPlate_1.generateFromBoilerPlate(`${constants_1.boilerplateDir}/App.js`, `${createTopProjectDirs_1.srcDir}/App.js`, options);
    // config
    // const configText = await createConfigFile(currentStack, appName)
    // // console.log(`configText=${configText}`)
    // fs.outputFile(`${srcDir}/config/index.js`, configText)
    // options = {files: '', from: [], to: []}
    // await generateFromBoilerPlate(`${boilerplateDir}/config.js`, `${srcDir}/config/index.js`, options)
}
exports.createHighestLevelFiles = createHighestLevelFiles;
