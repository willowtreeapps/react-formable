/* tslint:disable */

import AnyObject from '../types/anyObject';

export default function values<T>(obj: AnyObject): any[] {
    let ret: T[] = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            ret.push(obj[key]);
        }
    }

    return ret;
}
