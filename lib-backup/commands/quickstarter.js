"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const createNoStackApp_1 = require("../apps/createNoStackApp");
const generateAppCode_1 = require("../codeGeneration/generateAppCode");
const buildStackFromTemplate_1 = require("../stacks/buildStackFromTemplate");
// import {createModerator} from '../stacks/createModerator'
const create_stack_and_moderator_1 = require("../stacks/create-stack-and-moderator");
const errorMessage_1 = require("../tools/errorMessage");
// import {createStackQuery} from '../stacks/create-stack-query'
// import {createModerator} from '../stacks/createModerator'
const isRequired_1 = require("../tools/isRequired");
// import {loginUser} from '../auth/loginUser'
const fs = require('fs-extra');
const Listr = require('listr');
class Quickstarter extends command_1.Command {
    async run() {
        const { args, flags } = this.parse(Quickstarter);
        const appName = flags.appName || isRequired_1.isRequired('appName');
        const stack = flags.stack || isRequired_1.isRequired('stack');
        const template = flags.template || isRequired_1.isRequired('template');
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
        const newAppTasks = await createNoStackApp_1.createNoStackApp(appName);
        const newStackTasks = await create_stack_and_moderator_1.createStackAndModerator(userInfo);
        const generateAppTasks = await generateAppCode_1.generateAppCode(appName);
        // @ts-ignore
        const tasks = new Listr([
            {
                title: 'Create a Placeholder NoStack App',
                task: async () => newAppTasks
            },
            {
                title: 'Create an Empty Stack',
                task: async () => newStackTasks
            },
            {
                title: 'Build Stack from Template',
                task: async () => {
                    // const json = await buildStackFromTemplate_1.buildStackFromTemplate(template, userInfo, email, addedSuffix);
                    // await fs.outputJson(`${appName}/stack.json`, JSON.parse(json), (err) => {
                    //   if (err) {
                    //     // @ts-ignore
                    //     throw new Error(console.error(err));
                    //   }
                    // });
                    //
                    const json = await buildStackFromTemplate_1.buildStackFromTemplate(template, userInfo, email, '');
                    const stackFile = `${appName}/stack.json`;
                    await fs.outputJson(stackFile, JSON.parse(json));
                    const isStackFile = await fs.pathExists(stackFile);
                    if (!isStackFile) {
                        throw new Error(errorMessage_1.errorMessage('stack file was not generated on the front end.'));
                    }
                }
            },
            {
                title: 'Generate Front End Code',
                task: async () => generateAppTasks,
            },
        ]);
        await tasks.run().catch((err) => {
            console.error(err);
        });
        if (args.file && flags.force) {
            this.log(`you input --force and --file: ${args.file}`);
        }
    }
}
exports.default = Quickstarter;
Quickstarter.description = 'Creates a new moderator and stack.  Also logs in the moderator locally.';
Quickstarter.examples = [
    '$ nostack quickstarter -u franky -s tempstack, -e franky@gmail.com -w franky12$',
];
Quickstarter.flags = {
    help: command_1.flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    appName: command_1.flags.string({ char: 'a', description: 'name of application' }),
    stack: command_1.flags.string({ char: 's', description: 'stack' }),
    template: command_1.flags.string({ char: 't', description: 'template from which to spin up a stack' }),
    licenseId: command_1.flags.string({ char: 'l', description: 'license id for the organization of the user' }),
    user: command_1.flags.string({ char: 'u', description: 'moderator to create' }),
    email: command_1.flags.string({ char: 'e', description: 'moderator email' }),
    password: command_1.flags.string({ char: 'w', description: 'moderator password' }),
    // flag with no value (-f, --force)
    force: command_1.flags.boolean({ char: 'f' }),
};
Quickstarter.args = [];
