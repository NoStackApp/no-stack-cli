"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs-extra');
const inflections_1 = require("../tools/inflections");
const createTopProjectDirs_1 = require("./createTopProjectDirs");
async function createFragmentsFile(currentStack) {
    // console.log('in createFragmentsFile')
    let fragmentsContent = "import gql from 'graphql-tag';";
    Object.keys(currentStack.types).map(key => {
        fragmentsContent += `

export const ${inflections_1.allCaps(key)}_FRAGMENT = gql\`
  fragment ${inflections_1.singularName(key)}Parts on Instance {
    id
    value
  }
\`;`;
    });
    const fragmentsFile = createTopProjectDirs_1.sourcePropsDir + '/fragments.js';
    try {
        await fs.outputFile(fragmentsFile, fragmentsContent);
    }
    catch (err) {
        console.error(err);
    }
}
exports.createFragmentsFile = createFragmentsFile;
