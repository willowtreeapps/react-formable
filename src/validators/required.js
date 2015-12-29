import isNil from '../helpers/isNil';

function emptyString(value) {
    return !value.trim().length;
}

function emptyObject(value) {
    return !Object.keys(value).length;
}

/*eslint func-style:0*/
export default function required(errorMessage) {
    return function (value) {
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
