/*eslint func-style:0*/
import mapObj from './mapObj';
import values from './values';

/**
 * map
 *
 * Not your traditional map which is probably bad. This version is a noop when
 * its data is null. Defaults to implemented map and also allows mapping over
 * objects
 *
 * map :: (a -> b) -> [a] | {a} -> [a] | {b}
 *
 * @param {Function} fn Callback that transforms a value
 * @param {a|Array|Object} data the information to map over
 * @return {a|Array|Object} Returns whatever the data value is transformed
 */
function map(fn) {
    return function (data) {
        if (!data) return;

        if (data.map) return data.map(fn);

        if (typeof data === 'object') {
            return mapObj(fn, data);
        }
    }
}

export default function tree({ ref, refs }) {
    return {
        // The children of the tree
        refs,

        // The value which we will map over
        ref,

        // Map over each ref in the tree reciving and modifying ref
        map: fn => tree({ ref: fn(ref), refs: map(map(fn))(refs) }),

        // Get the value of the (sub)tree as an object / array
        extract: () => refs ? map(x => x.extract())(refs) : ref,

        // Create a new tree by maping over the full tree
        // f takes in the full tree value. Whatever f returns gets
        // stored within the value of the node. Recuses down the tree
        extend: (f) => tree({
            ref: f(tree({ ref, refs })),
            refs: map(x => x.extend(f))(refs)
        }),

        // Boil down the tree into one value, node by node
        // fn recives the ref value for each node
        reduce: (fn, acc) => {
            return values(refs).reduce((memo, node) => {
                return node.reduce(fn, memo);
            }, fn(acc, ref));
        }
    };
}
