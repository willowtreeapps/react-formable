/* tslint:disable: no-any */
import isNil from '../helpers/isNil';

function emptyString(value: string): boolean {
    return !value.trim().length;
}

function emptyObject(value: any): boolean {
    return !Object.keys(value).length;
}

export default function required(errorMessage: string): (value: any) => string {
    return function (value: any): string {
        if (isNil(value)) {
            return errorMessage;
        }
        if (typeof value === 'string' && emptyString(value)) {
            return errorMessage;
        } else if (typeof value === 'object' && emptyObject(value)) {
            return errorMessage;
        }
    };
}
