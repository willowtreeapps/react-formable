import inflateTree from './inflateTree';
import { TreeNode } from './treenode'

export type EventType = 'onChange' | 'onSubmit' | 'serialize';

// We want to wait for all promises to settle, regardless if they resolve or reject.
const promiseEvery = <T>(arr: (Promise<T> | T)[]): Promise<T[]> =>
    Promise.all(arr.map(val => Promise.resolve(val).catch(x => x)));

const validateNode = (node: TreeNode, form: any, eventType: EventType): Promise<TreeNode> => {
    return promiseEvery(node.validators.map(fn => fn(node.value || '', form, eventType)))
        .then((fieldErrors: any) => {
            return {
                ...node,
                fieldErrors: fieldErrors.filter((x: any) => x)
            }
        })
}

export const validate = (tree: TreeNode[], form: any, eventType: EventType, paths: string[]) => {
    // Conver the paths array into a key value lookup
    const isPath = paths.reduce((memo, path) => ({ ...memo, [path]: true }), {})

    const promisedTree = promiseEvery(
        tree.map(node =>
            isPath[node.path.join('.')]
                ? validateNode(node, form, eventType)
                : node
        )
    )

    return promisedTree.then(validatedTree => {
        const errors = validatedTree
            .reduce<any[]>((memo, node) => memo.concat(node.fieldErrors), [])
            .filter((val, i, self) => self.indexOf(val) === i)

        return {
            validatedTree,
            errors,
            valid: !errors.length,
            fieldErrors: inflateTree('fieldErrors', validatedTree)
        }
    })
}
