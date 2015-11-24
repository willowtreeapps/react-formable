export default function uniq(arr) {
    return arr.reduce(function(memo, item) {
        return memo.indexOf(item) === -1 ?  memo.concat(item) : memo;
    }, []);
}
