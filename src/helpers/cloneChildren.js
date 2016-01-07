/*eslint func-style:0*/
import React from 'react';
import identity from './identity';
import compose from './compose';
import warning from 'warning';

const leafCloneRule = {
    predicate: (child) => typeof child !== 'object' || child === null,
    clone: identity
}

function defaultRecursiveCloneRule(rule) {
    return {
        predicate: () => true,
        clone: child => React.cloneElement(child, {}, cloneChildren(rule, child.props && child.props.children))
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
export function createErrorsRule({ errors = [], fieldErrors = {} }) {
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


/*
 * Clone the properties of something we are interested in weaving in our magic
 */
function cloneFormableComponentProperties(errors, fieldErrors, onSubmit, onChange, childNames) {
    return (child) => {
        warning(!child.ref, `Attempting to attach ref "${child.ref}" to "${child.props.name}" will be bad for your health`);
        warning(childNames.indexOf(child.props.name) === -1, `Duplicate name "${child.props.name}" found. Duplicate fields will be ignored`);
        childNames.push(child.props.name);

        return {
            ref: child.ref || child.props.name,
            onChange: compose(onChange, child.props.onChange || identity),
            onSubmit: compose(onSubmit, child.props.onSubmit || identity),
            errors: errors,
            fieldErrors: child.props.fieldErrors || fieldErrors[child.props.name]
        };
    }
}

export function createFormableRule(
    { errors = [], fieldErrors = {} },
    onSubmit = identity,
    onChange = identity) {
    let childNames = [];

    return {
        predicate: child => child.props && child.props.name,
        clone: child => {
            return React.cloneElement(
                child,
                cloneFormableComponentProperties(errors, fieldErrors, onSubmit, onChange, childNames)(child),
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
    if (children) {
        return React.Children.map(children, cloneChild(rules));
    }
}
