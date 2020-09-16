import { binarySearch } from "./algorithms";

const PREFERRED_SAMPLE_COUNT = 1000;

export class Fibonacci {

    private readonly cache = [0, 1];

    constructor(sampleCount: number = PREFERRED_SAMPLE_COUNT) {
        for (let i = this.cache.length; i < sampleCount; ++i) {
            this.cache[i] = this.cache[i - 2] + this.cache[i - 1];
        }
    }

    public isFibonacci(number: number): boolean {
        return binarySearch(this.cache, number) !== undefined;
    }
}
