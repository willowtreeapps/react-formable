/*eslint func-style:0*/
export default function lessThan(lessThanValue, errorMessage) {
    return function (value) {
        if (lessThanValue < parseFloat(value, 10)) {
            return errorMessage;
        }
    };
}
