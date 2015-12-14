/*eslint func-style:0*/
export default function values(obj) {
    let ret = [];

    for(let key in obj) {
        ret = ret.concat(obj[key]);
    }
    return ret;
}
