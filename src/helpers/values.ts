import GenericObject from '../types/genericObject';

export default function values<T>(obj: GenericObject<T>): T[] {
    let ret: T[] = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            ret.push(obj[key]);
        }
    }

    return ret;
}
