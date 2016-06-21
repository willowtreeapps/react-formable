/* tslint:disable */
export default function compose(f2: any, f1: any) {
    return function (...args: any[]) {
        return f2(f1(...args));
    };
}
