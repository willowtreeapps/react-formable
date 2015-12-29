import isNil from '../helpers/isNil';

/*eslint func-style:0*/
export default function maxLength(maxLength, errorMessage) {
    return function (value) {
        if (isNil(value) || value.length > maxLength) {
            return errorMessage;
        }
    };
}
