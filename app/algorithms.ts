export type BinarySearchValue = number;
export type BinarySearchArray = BinarySearchValue[];
export type BinarySearchIndex = number;

export function binarySearch(
    array: BinarySearchArray,
    element: BinarySearchValue,
    indexFrom: BinarySearchIndex = 0,
    indexTo: BinarySearchIndex = array.length): number | undefined
{
    if (!array.length) {
        return undefined;
    }

    const beg = indexFrom;
    const end = indexTo - 1;

    if (beg < 0 || end < beg) {
        return undefined;
    }

    if (array[beg] === element) {
        return beg;
    }

    if (array[end] === element) {
        return end;
    }

    if (array[beg] > element) {
        return undefined;
    }

    if (array[end] < element) {
        return undefined;
    }

    const mid = Math.floor((beg + end) / 2);
    const low = binarySearch(array, element, beg, mid);
    if (low !== undefined) {
        return low;
    }

    const high = binarySearch(array, element, mid, end);
    if (high !== undefined) {
        return high;
    }

    return undefined;
}