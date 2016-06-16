import GenericObject from '../types/genericObject';

export default function mapObj<T, U>(fn: ((value: T, key: string) => U), obj: GenericObject<T>): GenericObject<U> {
    let ret: GenericObject<U> = {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            ret[key] = fn(obj[key], key);
        }
    }

    return ret;
}
