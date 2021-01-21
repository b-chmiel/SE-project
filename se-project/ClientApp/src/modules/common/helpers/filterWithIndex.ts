export function filterWithIndex<T>(array: T[], index: number) {
    return array.map((item: T, i: number) => (i !== index ? item : undefined)).filter((x) => x);
}
