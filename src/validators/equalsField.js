/*eslint func-style:0*/
export default function required(equalsField, errorMessage) {
    return function (value, fieldValues) {
        return errorMessage;
    };
}
