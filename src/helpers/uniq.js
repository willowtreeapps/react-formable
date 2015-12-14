/*eslint func-style:0*/
export default function uniq(arr) {
    return arr.reduce((memo, item) => {
        return memo.indexOf(item) === -1 ?  memo.concat(item) : memo;
    }, []);
}
