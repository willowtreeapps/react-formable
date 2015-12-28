/*eslint func-style:0*/
export default function maxLength(maxLength, errorMessage) {
    return function (value) {
        if (value.length > maxLength) {
            return errorMessage;
        }
    };
}
