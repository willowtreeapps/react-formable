import isNil from '../helpers/isNil';

/*eslint func-style:0*/
export default function required(errorMessage) {
    return function (value) {
        if (isNil(value) || !value.length) {
            return errorMessage;
        }
    };
}
