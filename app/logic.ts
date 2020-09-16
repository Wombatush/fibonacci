import {Input, Output} from "./io";
import {Fibonacci} from "./fibonacci";

const MILLISECONDS_IN_SECOND = 1000;

export type LogicVoidDelegate = () => void;
export type LogicNumberDelegate = (number: number) => void;

export interface Logic {
    addNumber: LogicNumberDelegate;
    checkFibonacci: LogicNumberDelegate;
    halt: LogicVoidDelegate;
    resume: LogicVoidDelegate;
    status: LogicVoidDelegate;
}

export type LogicFactory = (input: Input, output: Output, intervalInSec: number) => Logic;

export const DefaultLogicFactory = (input: Input, output: Output, intervalInSec: number) => new DefaultLogic(input, output, intervalInSec);

export class DefaultLogic implements Logic {

    private readonly input: Input;
    private readonly output: Output;
    private readonly interval: number;

    private readonly numbers: Record<number, number> = { };

    private readonly fibonacci: Fibonacci;

    private timer: NodeJS.Timeout | null = null;

    constructor(
        input: Input,
        output: Output,
        intervalInSec: number,
        fibonacci?: Fibonacci) {
        this.input = input;
        this.output = output;
        this.fibonacci = fibonacci || new Fibonacci();
        this.interval = intervalInSec * MILLISECONDS_IN_SECOND;
    }

    public addNumber(number: number) {
        if (this.numbers[number]) {
            this.numbers[number] = ++this.numbers[number];
        } else {
            this.numbers[number] = 1;
        }
    }

    public checkFibonacci(number: number) {
        if (this.fibonacci.isFibonacci(number)) {
            this.output.log("FIB");
        }
    }

    public halt(): void {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    public resume(): void {
        if (!this.timer) {
            this.timer = setInterval(() => this.status(), this.interval);
        }
    }

    public status() {
        const status = Object
            .keys(this.numbers)
            .map(key => `${key}:${this.numbers[parseInt(key)]}`)
            .join(", ");
        this.output.log(status);
    }
}