/*eslint func-style:0*/
export default function lessThan(lessThanValue, errorMessage) {
    return function (value) {
        if (parseFloat(value) >= lessThanValue) {
            return errorMessage;
        }
    };
}
