"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs-extra');
const replace = require('replace-in-file');
async function generateFromBoilerPlate(boilerPlate, newFile, substitutions) {
    // console.log(`boilerPlate=${boilerPlate}, newFile=${newFile}`)
    try {
        await fs.copy(boilerPlate, newFile);
        // console.log('success!')
    }
    catch (err) {
        console.error(err);
    }
    const options = substitutions;
    // @ts-ignore
    substitutions.files = newFile;
    try {
        await replace(options);
        // const results = await replace(options)
        // console.log('Replacement results:', results)
    }
    catch (error) {
        console.error('Error occurred:', error);
    }
}
exports.generateFromBoilerPlate = generateFromBoilerPlate;
