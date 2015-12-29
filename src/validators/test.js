/*eslint func-style:0*/
export default function test(regexp, errorMessage) {
    return function (value) {
        const r = regexp && regexp.test ? regexp : new RegExp(regexp);

        if (!r.test(value)) {
            return errorMessage;
        }
    };
}
