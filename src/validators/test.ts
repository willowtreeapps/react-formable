export default function test(regexp: string | RegExp, errorMessage: string): (value: string | RegExp) => string {
    return function (value: string): string {
        let r;
        if (typeof regexp === 'string') {
            r = new RegExp(regexp);
        } else {
            r = regexp;
        }

        if (!r.test(value)) {
            return errorMessage;
        }
    };
}
