import { Command, flags } from '@oclif/command';
export default class Createstack extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        stack: flags.IOptionFlag<string | undefined>;
        licenseId: flags.IOptionFlag<string | undefined>;
        user: flags.IOptionFlag<string | undefined>;
        email: flags.IOptionFlag<string | undefined>;
        password: flags.IOptionFlag<string | undefined>;
        force: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    static args: never[];
    run(): Promise<void>;
}
