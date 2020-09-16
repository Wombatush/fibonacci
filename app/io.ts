import readline from "readline";

export type QueryUserCallbackNumber = (value: number) => void;
export type QueryUserCallback<T> = (value: T) => void;

export type QueryUserParserNumber = (value: string) => number;
export type QueryUserParser<T> = (value: string) => T;

export type QueryUserValidatorNumber = (value: number) => Error | null;
export type QueryUserValidator<T> = (value: T) => Error | null;

export const DefaultParserInt: QueryUserParserNumber = (value) => parseInt(value);

export const DefaultValidatorNumber: QueryUserValidatorNumber = () => null;

export const DefaultValidatorInt: QueryUserValidatorNumber = function (value) {
    if (isNaN(value)) {
        return new Error("The number does not represent an integer.");
    }
    return null;
}

export const DefaultValidatorIntGreaterThanZero: QueryUserValidatorNumber = function (value) {
    if (isNaN(value)) {
        return new Error("The number does not represent an integer.");
    }
    if (value <= 0) {
        return new Error("The number does not represent an integer greater than zero.");
    }
    return null;
}

export type QueryUser<T> = (
    question: string,
    callback: QueryUserCallback<T>,
    parse: QueryUserParser<T>,
    validate: QueryUserValidator<T>) => void;

export type LogMessage = (message: string) => void;

export function queryUserForNumber(
    input: Input,
    question: string,
    callback: QueryUserCallbackNumber,
    validate: QueryUserValidatorNumber | undefined = undefined): void {
    input.queryUser(
        question,
        callback,
        DefaultParserInt,
        validate || DefaultValidatorNumber);
}

export function queryUserForInt(
    input: Input,
    question: string,
    callback: QueryUserCallbackNumber): void {
    queryUserForNumber(input, question, callback, DefaultValidatorInt);
}

export function queryUserForIntGreaterThanZero(
    input: Input,
    question: string,
    callback: QueryUserCallbackNumber): void {
    queryUserForNumber(input, question, callback, DefaultValidatorIntGreaterThanZero);
}

export interface Input {
    queryUser: QueryUser<any>;
}

export interface Output {
    log: LogMessage;
}

export class CommandLineInput implements Input {
    private readonly rl: readline.Interface;
    private readonly output?: Output;

    constructor(output?: Output) {
        this.output = output;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    public close() {
        this.rl.close();
    }

    public queryUser(
        question: string,
        callback: QueryUserCallback<any>,
        parse: QueryUserParser<any>,
        validate: QueryUserValidator<any>): void {
        const self = this;
        self.rl.question(`${question}\n`, function (answer) {
            const parsed = parse(answer);
            const error = validate(parsed);
            if (error) {
                self.output?.log(error.message)
                setImmediate(() => self.queryUser(question, callback, parse, validate))
            } else {
                setImmediate(() => callback(parsed));
            }
        });
    }
}

export class CommandLineOutput implements Output {
    log(message: string): void {
        console.log(message);
    }
}