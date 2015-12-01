export default function mapObj(fn, obj) {
    let ret = {};
    for(let key in obj) {
        ret[key] = fn(obj[key], key);
    }
    return ret;
}
