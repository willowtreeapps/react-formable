/*eslint func-style:0*/
export default function regexp(regexp, errorMessage) {
    return function (value) {
        const r = regexp && regexp.test ? regexp : new RegExp(regexp);

        if (r.test(value)) {
            return errorMessage;
        }
    };
}
