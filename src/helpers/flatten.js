/*eslint func-style:0*/
export default function flatten(arr) {
    return [].concat.apply([], arr);
}
