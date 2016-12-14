// @flow

import React from 'react'
import Errors from './Errors'

const findInTree = (path, key, arr=[]) => {
    let keyNode, pathNode

    for (let i = 0; i < arr.length; i++) {
        if(key && arr[i].key && arr[i].key === key)
            keyNode = keyNode || arr[i]

        if(arr[i].path === path)
            pathNode = pathNode || arr[i]
    }

    return keyNode || pathNode
}

type TreeNode = {
    path: string,
    name: string,
    key: ?string,
    value: ?any,
    defaultValue: ?any,
    getValue: () => ?any,
    validators: any[],
    fieldErrors: any[]
}

type CloneOptions = {
    children: any,
    path: string,
    tree: TreeNode[],
    nodeIndexCount: { [string]: number },
    propName: string,
    eventName: string,
    getValueFromEvent: any,
    onChange: any,
    fieldErrorsToProps: any,
    previousRenderTree: TreeNode[],
    errors: any[],
    key?: string
}

const clone = (options: CloneOptions) => {
    let tree = []
    let nodeIndexCount = { ...options.nodeIndexCount }

    const children = React.Children.map(options.children, child => {
        // CASE: Plain Text (Non React node)
        if (typeof child !== 'object' || child === null)
            return child

        // CASE: Errors Component
        if (child.type === Errors)
            return React.cloneElement(child, { _errors: options.errors })

        const childName = child.props[options.propName]

        // CASE: Non Formable Node, div, span, etc
        if (!childName) {
            const cloneResults = clone({
                ...options,
                children: child.props.children,
                nodeIndexCount,
            })
            nodeIndexCount = cloneResults.nodeIndexCount
            tree = tree.concat(cloneResults.tree)
            return React.cloneElement(child, {}, cloneResults.children)
        }

        nodeIndexCount[childName] = (nodeIndexCount[childName] || 0) + 1
        const nodeIndex = nodeIndexCount[childName] - 1

        // CASE: Formable Node
        let newPath = [options.path, childName, nodeIndex && `[${nodeIndex}]`].filter(x => x).join('.')
        const { children, tree: subTree } = clone({
            ...options,
            children: child.props.children,
            path: newPath,
            tree,
            nodeIndexCount: {}
        })

        // SUBCASE: Formable node with children (wrapper node)
        if (children) {
            tree = tree.concat(subTree)
            return React.cloneElement(child, {}, children)
        }

        // SUBCASE: Normal Formable node without children
        const oldTreeNode = findInTree(newPath, child.key, options.previousRenderTree)
        let eventValue = oldTreeNode ? oldTreeNode.getValue() : undefined
        const fieldErrors = oldTreeNode ? oldTreeNode.fieldErrors : []

        tree = tree.concat({
            name: childName,
            path: newPath,
            key: child.key,
            value: child.props.value,
            defaultValue: child.props.defaultValue,
            getValue: () => eventValue,
            validators: (child.props.validators || []).concat(child.type.validators || []),
            fieldErrors
        })

        return React.cloneElement(child, {
            ...(options.fieldErrorsToProps(fieldErrors, child.props)),
            [options.eventName]: (e) => {
                eventValue = options.getValueFromEvent(e)
                options.onChange()
                if (child.props[options.eventName]) {
                    child.props[options.eventName](e)
                }
            }
        })
    })

    return { children, tree, nodeIndexCount }
}

export default clone
