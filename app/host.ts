import {
    HALT_COMMAND,
    QUIT_COMMAND,
    RESUME_COMMAND,
    isCommandUserInput,
    isNumberUserInput,
    UserInput
} from "./commands";
import {
    CommandLineInput,
    CommandLineOutput,
    queryUserForInt,
    queryUserForIntGreaterThanZero
} from "./io";
import {
    Logic,
    LogicFactory
} from "./logic";

export interface Host {
    run: () => void;
}

export type HostFactory = (logicFactory: LogicFactory) => Host;

export const CommandLineHostFactory: HostFactory = (logicFactory: LogicFactory) => new CommandLineHost(logicFactory);

export class CommandLineHost implements Host {

    private readonly output: CommandLineOutput;
    private readonly input: CommandLineInput;
    private readonly factory: LogicFactory;

    private logic: Logic | null = null;

    constructor(logicFactory: LogicFactory) {
        this.output = new CommandLineOutput();
        this.input = new CommandLineInput(this.output);
        this.factory = logicFactory;
    }

    public run(): void {
        queryUserForIntGreaterThanZero(this.input, "Please input the number of time in seconds between emitting numbers and their frequency", x => this.onIntervalReady(x));
    }

    private loop() {
        this.input.queryUser( "Please enter the next number", x => this.onNext(x), CommandLineHost.parse, CommandLineHost.validate);
    }

    private onIntervalReady(intervalInSec: number) {
        this.logic = this.factory(this.input, this.output, intervalInSec);
        queryUserForInt(this.input, "Please enter the first number", x => this.onFirstNumberReady(x));
    }

    private onFirstNumberReady(firstNumber: number) {
        this.logic!!.addNumber(firstNumber);
        this.logic!!.checkFibonacci(firstNumber);
        this.logic!!.resume();
        setImmediate(() => this.loop());
    }

    private onNextNumberReady(nextNumber: number) {
        this.logic!!.addNumber(nextNumber);
        this.logic!!.checkFibonacci(nextNumber);
        setImmediate(() => this.loop());
    }

    private onNext(value: UserInput) {
        if (isCommandUserInput(value)) {
            switch (value) {
                case QUIT_COMMAND:
                    this.onQuit();
                    return;
                case HALT_COMMAND:
                    this.onHalt();
                    return;
                case RESUME_COMMAND:
                    this.onResume()
                    return;
            }
        }

        this.onNextNumberReady(value);
    }

    private onHalt() {
        this.logic!!.halt();
        this.output.log("Timer halted");
        setImmediate(() => this.loop());
    }

    private onResume() {
        this.logic!!.resume();
        this.output.log("Timer resumed");
        setImmediate(() => this.loop());
    }

    private onQuit() {
        this.logic!!.halt();
        this.logic!!.status();
        this.output.log("Thanks for playing, application will now exit.");
        this.input.close();
        setImmediate(() => process.exit(0));
    }

    private static parse(value: string): UserInput {
        const number = parseInt(value);
        if (!isNaN(number)) {
            return number;
        }

        switch (value) {
            case QUIT_COMMAND:
            case HALT_COMMAND:
            case RESUME_COMMAND:
                return value;

            default:
                return NaN;
        }
    }

    private static validate(value: UserInput): Error | null {
        if (!isNumberUserInput(value) && !isCommandUserInput(value)) {
            return new Error("The number does not represent an integer.");
        }

        return null;
    }
}