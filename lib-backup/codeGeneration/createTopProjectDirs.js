"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inflections_1 = require("../tools/inflections");
const makeDirs_1 = require("./makeDirs");
let appDir;
exports.appDir = appDir;
let srcDir;
exports.srcDir = srcDir;
let compDir;
exports.compDir = compDir;
let sourcePropsDir;
exports.sourcePropsDir = sourcePropsDir;
async function createTopProjectDirs(currentStack, appName) {
    let dirList = [];
    exports.appDir = appDir = appName;
    exports.srcDir = srcDir = `${appDir}/src`;
    exports.compDir = compDir = `${srcDir}/components`;
    exports.sourcePropsDir = sourcePropsDir = `${compDir}/source-props`;
    // general directories
    dirList.push(appDir);
    dirList.push(srcDir);
    dirList.push(`${appDir}/docs`);
    dirList.push(`${compDir}/NavBar`);
    dirList.push(`${srcDir}/config`);
    dirList.push(`${srcDir}/client`);
    dirList.push(sourcePropsDir);
    dirList.push(compDir);
    // source directories
    // console.log(`currentStack.sources=${JSON.stringify(currentStack.sources, null, 2)}`)
    Object.keys(currentStack.sources).map(function (key) {
        dirList.push(`${compDir}/${inflections_1.singularName(currentStack.sources[key].name)}`);
    });
    await makeDirs_1.makeDirs(dirList);
}
exports.createTopProjectDirs = createTopProjectDirs;
