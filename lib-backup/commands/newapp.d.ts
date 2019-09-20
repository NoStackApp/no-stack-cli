import { Command, flags } from '@oclif/command';
export default class Newapp extends Command {
    static description: string;
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        appName: flags.IOptionFlag<string | undefined>;
    };
    run(): Promise<void>;
}
