"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function createConfigFile(currentStack, appName) {
    // const boilerPlateDir = `${boilerplateDir}/codeGeneration/boilerplates`
    let outputText = `// This file was generated automatically by nostack for the app '${appName}'.  If you build a new stack from a template, you should replace it.
// If you modify your current stack to add actions, sources, or types, it would make sense to add constants here.

// platform id
export const PLATFORM_ID = '${currentStack.stack.stackId}';
`;
    // actions
    outputText += '\n' +
        '// action ids';
    Object.keys(currentStack.actions).map(actionType => {
        outputText += `\n  // ${actionType}`;
        const actionsForCurrentType = currentStack.actions[actionType];
        Object.keys(actionsForCurrentType).map(action => {
            const currentActionInfo = actionsForCurrentType[action];
            outputText += `\nexport const ${currentActionInfo.const}='${currentActionInfo.id}';`;
        });
    });
    // sources
    outputText += '\n\n// source ids';
    Object.keys(currentStack.sources).map(sourceName => {
        const currentSourceInfo = currentStack.sources[sourceName];
        outputText += `\nexport const ${currentSourceInfo.const}='${currentSourceInfo.id}';`;
    });
    // types
    outputText += '\n\n// type ids';
    Object.keys(currentStack.types).map(typeName => {
        const currentTypeInfo = currentStack.types[typeName];
        outputText += `\nexport const ${currentTypeInfo.const}='${currentTypeInfo.id}';`;
    });
    return outputText;
}
exports.createConfigFile = createConfigFile;
