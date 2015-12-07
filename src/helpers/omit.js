export default function omit(names, obj) {
    var result = {};
    for (var prop in obj) {
        if (names.indexOf(prop) === -1) {
            result[prop] = obj[prop];
        }
    }
    return result;
}
