/*eslint func-style:0*/
import React from 'react';

function isLeaf(element) {
    return typeof element !== 'object' || element === null;
}

const leafCloneRule = {
    predicate: isLeaf,
    clone: child => child
}

function defaultRecursiveCloneRule(rule) {
    return {
        predicate: () => true,
        clone: child => {
            return React.cloneElement(
                child,
                {},
                cloneChildren(rule, child.props && child.props.children)
            )
        }
    }
}

function cloneChild(cloneRules) {
    const rules = [leafCloneRule, ...cloneRules, defaultRecursiveCloneRule(cloneRules)];

    return (child) => {
        const rule = rules.find(rule => rule.predicate(child));

        return rule.clone(child);
    }
}

/**
 * A common function for cloning Errors element that takes care of injecting
 * required error data
 *
 * @param {Object} errors aaaaa
 * @param {Object} fieldErrors bbbb
 * @return {Object} rule for cloning Errors element
 */
export function errorsRule({ errors, fieldErrors = {} }) {
    return {
        predicate: child => child.type && child.type.displayName === 'Errors',
        clone: child => {
            return React.cloneElement(
                child,
                {
                    errors: errors,
                    fieldErrors: fieldErrors
                },
                child.props && child.props.children
            );
        }
    }
}

/**
 * Clones a child subtree using the supplied rules which are composed of predicates
 * and clone instructions.
 *
 * @param  {array} rules any specific {pred/clone func} for bespoke children cloning
 * @param  {Function} children The children to iterate over
 * @return {Object} The cloned children
 */
export default function cloneChildren(rules, children) {
    //TODO: feels like this should be able to go... and in turn collapse isLeaf:fn
    if (isLeaf(children)) {
        return children;
    }

    return React.Children.map(children, cloneChild(rules));
}
