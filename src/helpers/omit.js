/*eslint func-style:0*/
export default function omit(names, obj) {
    let result = {};

    for (let prop in obj) {
        if (names.indexOf(prop) === -1) {
            result[prop] = obj[prop];
        }
    }
    
    return result;
}
