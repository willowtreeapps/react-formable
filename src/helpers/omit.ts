import GenericObject from '../types/genericObject';

export default function omit<T>(names: string[], obj: GenericObject<T>): GenericObject<T> {
    let result: GenericObject<T> = {};

    for (let prop in obj) {
        if (names.indexOf(prop) === -1) {
            result[prop] = obj[prop];
        }
    }

    return result;
}
