"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
// import {createModerator} from '../stacks/createModerator'
const create_stack_and_moderator_1 = require("../stacks/create-stack-and-moderator");
const isRequired_1 = require("../tools/isRequired");
class Createstack extends command_1.Command {
    async run() {
        const { args, flags } = this.parse(Createstack);
        const stack = flags.stack || isRequired_1.isRequired('stack');
        const user = flags.user || isRequired_1.isRequired('user');
        const password = flags.password || isRequired_1.isRequired('password');
        const email = flags.email || isRequired_1.isRequired('email');
        const licenseId = flags.licenseId || isRequired_1.isRequired('licenseId');
        let userInfo = {
            name: user,
            stack,
            password,
            email,
            licenseId,
            stackId: '',
            refreshToken: '',
            accessToken: '',
            id: '',
        };
        // console.log(`userInfo:${JSON.stringify(userInfo)}`)
        // await createStackAndModerator(userInfo)
        const newStackTasks = await create_stack_and_moderator_1.createStackAndModerator(userInfo);
        await newStackTasks.run().catch((err) => {
            console.error(err);
        });
        if (args.file && flags.force) {
            this.log(`you input --force and --file: ${args.file}`);
        }
    }
}
exports.default = Createstack;
Createstack.description = 'Creates a new moderator and stack.  Also logs in the moderator locally.';
Createstack.examples = [
    '$ nostack createStack -u franky -s tempstack, -e franky@gmail.com -w franky12$',
];
Createstack.flags = {
    help: command_1.flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    // appName: flags.string({char: 'a', description: 'name of application'}),
    stack: command_1.flags.string({ char: 's', description: 'stack' }),
    licenseId: command_1.flags.string({ char: 'l', description: 'license id for the organization of the user' }),
    user: command_1.flags.string({ char: 'u', description: 'moderator to create' }),
    email: command_1.flags.string({ char: 'e', description: 'moderator email' }),
    password: command_1.flags.string({ char: 'w', description: 'moderator password' }),
    // flag with no value (-f, --force)
    force: command_1.flags.boolean({ char: 'f' }),
};
Createstack.args = [];
