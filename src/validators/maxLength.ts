import isNil from '../helpers/isNil';

export default function maxLength(maxLength: number, errorMessage: string): (value: string) => string {
    return function (value: string): string {
        if (isNil(value) || value.length > maxLength) {
            return errorMessage;
        }
    };
}
