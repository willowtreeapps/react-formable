/*eslint func-style:0*/
import mapObj from './mapObj';
import values from './values';

function map(fn) {
    return function (data) {
        if (!data) return;

        if (data.map) return data.map(fn);

        if (typeof data === 'object') {
            return mapObj(fn, data);
        }
    }
}

function extract(obj) {
    return obj.extract();
}

export default function tree({ ref, refs }) {
    return {
        // The children of the tree
        refs,

        // The value which we will map over
        ref,

        // Map over each ref in the tree
        map: fn => tree({ ref: fn(ref), refs: map(map(fn))(refs) }),

        // Get the value of the (sub)tree as an object / array
        extract: () => refs ? map(extract)(refs) : ref,

        // Create a new tree by maping over the full tree
        extend: (f) => tree({
            ref: f(tree({ ref, refs })),
            refs: map(x => x.extend(f))(refs)
        }),
        
        // Boil down the tree into one value, node by node
        reduce: (fn, acc) => {
            return values(refs).reduce((memo, node) => {
                return node.reduce(fn, memo);
            }, fn(acc, ref));
        }
    };
}
