"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const getUserInfo_1 = require("../auth/getUserInfo");
const newUserInfo_1 = require("../auth/newUserInfo");
const buildStackFromTemplate_1 = require("../stacks/buildStackFromTemplate");
const isRequired_1 = require("../tools/isRequired");
const fs = require('fs-extra'); // @ts-ignore
class Spinstack extends command_1.Command {
    // static args = [{name: 'file'}]
    async run() {
        const { flags } = this.parse(Spinstack);
        const appName = flags.appName || isRequired_1.isRequired('appName');
        const user = flags.user || isRequired_1.isRequired('user');
        const template = flags.template || isRequired_1.isRequired('template');
        const stack = flags.stack || isRequired_1.isRequired('stack');
        const email = flags.email || isRequired_1.isRequired('email');
        const addedSuffix = flags.addedSuffix || '';
        let userInfo = newUserInfo_1.newUserInfo(user);
        userInfo.stack = stack;
        // console.log(`in spinstack, userInfo:${JSON.stringify(userInfo)}`)
        userInfo = await getUserInfo_1.getUserInfo(userInfo);
        // console.log(`in spinstack after getUserInfo, userInfo:${JSON.stringify(userInfo)}`)
        const json = await buildStackFromTemplate_1.buildStackFromTemplate(template, userInfo, email, addedSuffix);
        await fs.outputJson(`${appName}/stack.json`, JSON.parse(json), (err) => {
            if (err) {
                // @ts-ignore
                throw new Error(console.error(err));
            }
        });
        this.log(`The stack ${stack} has been generated.
    The file ${appName}/stack.json contains some information about it.`);
        // this.log(`json produced: ${JSON.stringify(JSON.parse(json), null, 2) }`)
    }
}
exports.default = Spinstack;
Spinstack.description = "Spins up a fully functional backend from a provided template.  The same template can then be used to generate front end code using the command 'makeCode'.";
Spinstack.flags = {
    help: command_1.flags.help({ char: 'h' }),
    appName: command_1.flags.string({ char: 'a', description: 'application name' }),
    stack: command_1.flags.string({ char: 's', description: 'stack' }),
    template: command_1.flags.string({ char: 't', description: 'template from which to spin up a stack' }),
    // flag with a value (-n, --name=VALUE)
    user: command_1.flags.string({ char: 'u', description: 'moderator for stack' }),
    email: command_1.flags.string({ char: 'e', description: 'email to be used by sample users' }),
    addedSuffix: command_1.flags.string({ char: 'x', description: 'added suffix for sample instances generated' }),
};
