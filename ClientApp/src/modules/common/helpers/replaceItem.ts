export function replaceAtIndex<T>(array: T[], index: number, newVal: T): T[] {
    return array.map((item: T, i: number) => (i === index ? newVal : item));
}
