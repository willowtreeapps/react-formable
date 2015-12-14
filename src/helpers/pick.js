/*eslint func-style:0*/
export default function pick(names, obj) {
    let result = {};
    let idx = 0;

    while (idx < names.length) {
        if (names[idx] in obj) {
            result[names[idx]] = obj[names[idx]];
        }
        idx += 1;
    }
    
    return result;
}
