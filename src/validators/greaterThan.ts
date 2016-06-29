export default function greaterThan(greaterThanValue: number, errorMessage: string): (value: string) => string {
    return function (value: string): string {
        if (parseFloat(value) <= greaterThanValue) {
            return errorMessage;
        }
    };
}
