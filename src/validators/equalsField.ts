/* tslint:disable: no-any */
import deepFind from '../helpers/deepFind';

export default function required(equalsField: string, errorMessage: string): (value: string, fieldValues: any) => string {
    return function (value: string, fieldValues: any): string {
        if (deepFind(fieldValues, equalsField) !== value) {
            return errorMessage;
        }
    };
}
