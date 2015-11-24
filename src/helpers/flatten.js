export default function flatten(arr) {
    return [].concat.apply([], arr);
}
