export default function uniq<T>(arr: T[]): T[] {
    return arr.reduce((memo, item) => {
        return memo.indexOf(item) === -1 ?  memo.concat(item) : memo;
    }, []);
}
