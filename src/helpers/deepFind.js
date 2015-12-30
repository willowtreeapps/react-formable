/*eslint func-style:0*/
export default function deepFind(obj, path) {
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
