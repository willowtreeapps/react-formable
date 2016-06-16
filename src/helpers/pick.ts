import GenericObject from '../types/genericObject';

export default function pick<T>(names: string[], obj: GenericObject<T>): GenericObject<T> {
    let result: GenericObject<T> = {};
    let idx = 0;

    while (idx < names.length) {
        if (names[idx] in obj) {
            result[names[idx]] = obj[names[idx]];
        }
        idx += 1;
    }

    return result;
}
