export default function lessThan(lessThanValue: number, errorMessage: string): (value: string) => string {
    return function (value: string): string {
        if (parseFloat(value) >= lessThanValue) {
            return errorMessage;
        }
    };
}
