import isNil from '../helpers/isNil';

export default function minLength(minLength: number, errorMessage: string): (value: string) => string {
    return function (value: string): string {
        if (isNil(value) || value.length < minLength) {
            return errorMessage;
        }
    };
}
