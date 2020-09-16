"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function binarySearch(array, element, indexFrom, indexTo) {
    if (indexFrom === void 0) { indexFrom = 0; }
    if (indexTo === void 0) { indexTo = array.length; }
    if (!array.length) {
        return undefined;
    }
    var beg = indexFrom;
    var end = indexTo - 1;
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
    var mid = Math.floor((beg + end) / 2);
    var low = binarySearch(array, element, beg, mid);
    if (low !== undefined) {
        return low;
    }
    var high = binarySearch(array, element, mid, end);
    if (high !== undefined) {
        return high;
    }
    return undefined;
}
exports.default = binarySearch;
