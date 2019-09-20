import { Command, flags } from '@oclif/command';
export default class Spinstack extends Command {
    static description: string;
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        appName: flags.IOptionFlag<string | undefined>;
        stack: flags.IOptionFlag<string | undefined>;
        template: flags.IOptionFlag<string | undefined>;
        user: flags.IOptionFlag<string | undefined>;
        email: flags.IOptionFlag<string | undefined>;
        addedSuffix: flags.IOptionFlag<string | undefined>;
    };
    run(): Promise<void>;
}
