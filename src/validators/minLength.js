import isNil from '../helpers/isNil';

/*eslint func-style:0*/
export default function minLength(minLength, errorMessage) {
    return function (value) {
        if (isNil(value) || value.length < minLength) {
            return errorMessage;
        }
    };
}
