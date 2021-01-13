export function isIterable(obj: any) {
    return obj === null || obj === undefined ? false : typeof obj[Symbol.iterator] === 'function';
}
