"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorEx = require('error-ex');
const command_1 = require("@oclif/command");
const getUserInfo_1 = require("../auth/getUserInfo");
const newUserInfo_1 = require("../auth/newUserInfo");
const callApiHelper_1 = require("../tools/callApiHelper");
const isRequired_1 = require("../tools/isRequired");
exports.noNameError = errorEx('noNameError');
class Callapi extends command_1.Command {
    async run() {
        // const {args, flags} = this.parse(Callapi)
        const { flags } = this.parse(Callapi);
        const user = flags.user || isRequired_1.isRequired('user');
        const stack = flags.stack || isRequired_1.isRequired('stack');
        const queryFile = flags.queryFile || isRequired_1.isRequired('queryFile');
        const variablesFile = flags.variablesFile || '';
        // this.log(`in callapi, queryFile=${queryFile}`)
        let userInfo = newUserInfo_1.newUserInfo(user);
        userInfo.stack = stack;
        // console.log(`in spinstack, userInfo:${JSON.stringify(userInfo)}`)
        userInfo = await getUserInfo_1.getUserInfo(userInfo);
        const queryData = await callApiHelper_1.callApiHelper(queryFile, userInfo, variablesFile);
        this.log(`Result:\n${JSON.stringify(queryData, null, 2)}`);
    }
}
exports.default = Callapi;
Callapi.description = 'Make a call to the nostack api. Takes care of auth for the user. ' +
    'You need to specify ' +
    'a file with the graphql query and another one with a json of the variables, if any' +
    'are used.';
Callapi.examples = [
    '$ nostack callapi -u irnold1y -s TestStack1y -q ~/projects/no-stack-queries/queries/sourceData1y.graphql -v ~/projects/no-stack-queries/variables/sourceData1y.json\n',
];
Callapi.flags = {
    user: command_1.flags.string({ char: 'u', description: 'moderator for stack' }),
    stack: command_1.flags.string({ char: 's', description: 'stack' }),
    queryFile: command_1.flags.string({ char: 'q', description: 'graphql file containing a single query' }),
    variablesFile: command_1.flags.string({ char: 'v', description: 'json file with query variables' }),
    help: command_1.flags.help({ char: 'h' }),
};
Callapi.args = [];
