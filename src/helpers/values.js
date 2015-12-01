export default function values(obj) {
    let ret = [];
    for(let key in obj) {
        ret.push(obj[key]);
    }
    return ret;
}
