import * as React from 'react'
import Errors from './Errors'
import {  } from './types/FormNode'
import { ConfigureForm, defaultConfigureInput } from './Form'
import { TreeNode } from './treenode'

const findInTree = (path: string[], key: string, arr: TreeNode[] = []) => {
    let keyNode, pathNode

    for (let i = 0; i < arr.length; i++) {
        if(key && arr[i].key && arr[i].key === key)
            keyNode = keyNode || arr[i]

        if(arr[i].path.join('.') === path.join('.'))
            pathNode = pathNode || arr[i]
    }

    return keyNode || pathNode
}

type CloneOptions = {
    children: any,
    path: string[],
    tree: TreeNode[],
    nodeIndexCount: { [key: string]: number },
    propName: string,
    onChange: (path: string[], value: any) => void,
    configureForm: ConfigureForm,
    previousRenderTree: TreeNode[],
    fieldErrorsToProps: (fieldErrors: any[], props: any) => any,
    errors: any[],
    key?: string,
    removeValidators: boolean,
    removePropName: boolean
}

const clone = (options: CloneOptions) => {
    let tree: TreeNode[] = []
    let nodeIndexCount = { ...options.nodeIndexCount }

    const children: any = React.Children.map(options.children, (child: any) => {
        // CASE: Plain Text (Non React node)
        if (typeof child !== 'object' || child === null)
            return child

        // CASE: Errors Component
        if (child.type === Errors)
            return React.cloneElement(child, { _errors: options.errors })

        const name = child.props[options.propName]

        // CASE: Non Formable Node, div, span, etc
        if (!name) {
            const cloneResults = clone({
                ...options,
                children: child.props.children,
                nodeIndexCount
            })
            nodeIndexCount = cloneResults.nodeIndexCount
            tree = tree.concat(cloneResults.tree)
            return React.cloneElement(child, {}, cloneResults.children)
        }

        nodeIndexCount[name] = (nodeIndexCount[name] || 0) + 1
        const nodeIndex = nodeIndexCount[name] - 1

        // CASE: Formable Node
        let path = [...options.path, name, nodeIndex && `[${nodeIndex}]`].filter(x => x)
        const { children, tree: subTree } = clone({
            ...options,
            path,
            tree,
            children: child.props.children,
            nodeIndexCount: {}
        })

        // SUBCASE: Formable node with children (wrapper node)
        if (subTree.length) {
            tree = tree.concat(subTree)
            return React.cloneElement(child, {}, children)
        }

        const { defaultProp, eventName, getValueFromEvent, fieldErrorsToProps, valueProp } = options.configureForm(child.type, child.props) || defaultConfigureInput
        const errorsToProps = fieldErrorsToProps || options.fieldErrorsToProps

        // SUBCASE: Normal Formable node without children
        const oldTreeNode = findInTree(path, child.key, options.previousRenderTree)
        const fieldErrors = oldTreeNode ? oldTreeNode.fieldErrors : []

        // If we have an old node, get the value from that node,
        // otherwise derive the value from props
        const value = oldTreeNode
                        ? oldTreeNode.value
                        : child.props[valueProp] !== undefined
                            ? child.props[valueProp]
                            : child.props[defaultProp]

        tree = tree.concat({
            value,
            fieldErrors,
            path,
            name,
            key: child.key,
            validators: [...(child.props.validators || []), ...(child.type.validators || [])],
        })

        let newProps = {
            ...child.props,
            ...errorsToProps(fieldErrors, child.props),
            ref: child.ref,
            [eventName]: (...args: any[]) => {
                options.onChange(path, getValueFromEvent(...args))
                if (child.props[eventName]) {
                    child.props[eventName](...args)
                }
            }
        }

        if (options.removeValidators)
            delete newProps.validators

        if (options.removePropName)
            delete newProps[options.propName]

        return React.createElement(child.type, newProps, children)
    })

    return { children, tree, nodeIndexCount }
}

export default clone
