import { TreeNode } from './treenode'

let setPath = (value: any, path: string[], json: any) => {
    // We reached the end, return the value as a leaf
    if (!path.length) return value

    // Figure out if we are going down an array or object
    const isArrayMatch = path[0].match(/^\[(\d+)\]$/)
    const name = isArrayMatch ? isArrayMatch[1] : path[0]

    const nextPathIsArray = path[1] && path[1].match(/^\[(\d+)\]$/)
    const nextPathIndex = nextPathIsArray ? nextPathIsArray[1] : ''

    // Add the value to our json recursivly
    json = json || (isArrayMatch ? [] : {})

    if (nextPathIndex === '1') {
        json[name] = [json[name]]
        json[name] = setPath(value, path.slice(1), json[name])
    }
    else {
        json[name] = setPath(value, path.slice(1), json[name])
    }

    return json
}

export default <S extends keyof TreeNode>(key: S, treeArray: TreeNode[]) => {
    return treeArray.reduce((tree, node) => setPath(node[key], node.path, tree), {})
}
