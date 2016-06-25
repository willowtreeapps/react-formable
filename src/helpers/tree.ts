/* tslint:disable */
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

export default function tree(value, children) {
    return {
        // The children of the tree
        value,

        // The value which we will map over
        children,

        // Map over each value in the tree reciving and modifying value
        map: fn => tree(fn(value), map(map(fn))(children)),

        // Get the value of the (sub)tree as an object / array
        extract: () => children ? map(x => x.extract())(children) : value,

        // Create a new tree by maping over the full tree
        // fn takes in the full tree value. Whatever fn returns gets
        // stored within the value of the node. Recuses down the tree
        extend: (fn) => tree(
            fn(tree(value, children)),
            map(x => x.extend(fn))(children)
        ),

        // Boil down the tree into one value, node by node
        // fn recives the value value for each node
        reduce: (fn, acc) => {
            return values(children).reduce((memo, node: any) => {
                return node.reduce(fn, memo);
            }, fn(acc, value));
        }
    };
}
