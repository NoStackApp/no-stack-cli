"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const createNoStackApp_1 = require("../apps/createNoStackApp");
const isRequired_1 = require("../tools/isRequired");
// import {createNoStackApp} from '../apps/createNoStackApp'
class Newapp extends command_1.Command {
    // static args = [{name: 'file'}]
    async run() {
        const { flags } = this.parse(Newapp);
        const appName = flags.appName || isRequired_1.isRequired('appName');
        const newAppTasks = await createNoStackApp_1.createNoStackApp(appName);
        await newAppTasks.run().catch((err) => {
            console.error(err);
        });
        // shell.exec(`/home/yisrael/projects/ns-cli/bin/create-no-stack-app "${appName}"`)
    }
}
exports.default = Newapp;
Newapp.description = 'create an empty new no-stack app.  Effectively combines create-react-app with apollo stuff and the no stack package.';
Newapp.flags = {
    help: command_1.flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    appName: command_1.flags.string({ char: 'a', description: 'name of application' }),
};
