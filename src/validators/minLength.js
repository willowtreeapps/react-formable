/*eslint func-style:0*/
export default function minLength(minLength, errorMessage) {
    return function (value) {
        if (value.length < minLength) {
            return errorMessage;
        }
    };
}
