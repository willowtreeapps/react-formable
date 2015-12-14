/*eslint func-style:0*/

export default function compose(f2, f1) {
    return function (...args) {
        return f2(f1(...args));
    };
}
