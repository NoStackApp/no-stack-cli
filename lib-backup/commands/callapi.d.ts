import { Command, flags } from '@oclif/command';
export declare const noNameError: any;
export default class Callapi extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        user: flags.IOptionFlag<string | undefined>;
        stack: flags.IOptionFlag<string | undefined>;
        queryFile: flags.IOptionFlag<string | undefined>;
        variablesFile: flags.IOptionFlag<string | undefined>;
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
    };
    static args: never[];
    run(): Promise<void>;
}
