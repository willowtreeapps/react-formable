/*eslint func-style:0*/
export default function greaterThan(greaterThanValue, errorMessage) {
    return function (value) {
        if (parseFloat(value) <= greaterThanValue) {
            return errorMessage;
        }
    };
}
