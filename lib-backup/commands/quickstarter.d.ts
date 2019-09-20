import { Command, flags } from '@oclif/command';
export default class Quickstarter extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        appName: flags.IOptionFlag<string | undefined>;
        stack: flags.IOptionFlag<string | undefined>;
        template: flags.IOptionFlag<string | undefined>;
        licenseId: flags.IOptionFlag<string | undefined>;
        user: flags.IOptionFlag<string | undefined>;
        email: flags.IOptionFlag<string | undefined>;
        password: flags.IOptionFlag<string | undefined>;
        force: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    static args: never[];
    run(): Promise<void>;
}
