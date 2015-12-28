/*eslint func-style:0*/
export default function greaterThan(greaterThanValue, errorMessage) {
    return function (value) {
        if (greaterThanValue > parseFloat(value, 10)) {
            return errorMessage;
        }
    };
}
