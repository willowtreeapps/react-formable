/* tslint:disable: no-any */
export default function promiseEvery(arr: any[]): Promise<any[]> {
    return Promise.all(arr.map(val => Promise.resolve(val).catch(x => x)));
}
