import { Command, flags } from '@oclif/command';
export declare const noNameError: any;
export default class Makecode extends Command {
    static description: string;
    static flags: {
        appName: flags.IOptionFlag<string | undefined>;
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        force: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    static args: never[];
    run(): Promise<void>;
}
