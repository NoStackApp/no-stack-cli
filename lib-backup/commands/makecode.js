"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorEx = require('error-ex');
const command_1 = require("@oclif/command");
const generateAppCode_1 = require("../codeGeneration/generateAppCode");
exports.noNameError = errorEx('noNameError');
class Makecode extends command_1.Command {
    async run() {
        // const {args, flags} = this.parse(Makecode)
        const { flags } = this.parse(Makecode);
        // const template = flags.template || ''
        const appName = flags.appName || '';
        if (appName === '') {
            this.log("no application name provided.  You must specify an app name with the flag '-a' or '-appName'");
            return;
        }
        const generateAppTasks = await generateAppCode_1.generateAppCode(appName);
        await generateAppTasks.run().catch((err) => {
            console.error(err);
        });
    }
}
exports.default = Makecode;
Makecode.description = 'generates a starter app from a json provided by NoStack';
Makecode.flags = {
    // template: flags.string({char: 't', description: 'template file'}),
    appName: command_1.flags.string({ char: 'a', description: 'application name' }),
    help: command_1.flags.help({ char: 'h' }),
    force: command_1.flags.boolean({ char: 'f' }),
};
Makecode.args = [];
