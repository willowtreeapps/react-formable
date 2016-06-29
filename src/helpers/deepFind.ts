/* tslint:disable */

export default function deepFind(obj: any, path: string): any {
    const paths = path.split('.');
    let current = obj, i;

    for (i = 0; i < paths.length; ++i) {
        if (current[paths[i]] == undefined) {
            return undefined;
        }
        current = current[paths[i]];
    }
    return current;
}
