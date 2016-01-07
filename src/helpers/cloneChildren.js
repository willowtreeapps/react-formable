/*eslint func-style:0*/
import React from 'react';
import identity from './identity';
import compose from './compose';
import warning from 'warning';

/**
 * Rule for cloning something at leaf level like some text
 */
const leafRule = {
    predicate: (child) => typeof child !== 'object' || child === null,
    clone: identity
}

/**
 * Allows default recursion into an element that has children.
 *
 * @param {array} rules on how to clone individual elements
 * @returns {Object} rule for cloning recursively
 */
function createRecursiveRule(rules) {
    return {
        predicate: () => true,
        clone: (child, childNames) => {
            return React.cloneElement(child, {},
                cloneChildren(rules, child.props && child.props.children, childNames));
        }
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
 * Get extra properties for something we are going to weave our formable magic into.
 */
function getFormableComponentProperties(errors, fieldErrors, onSubmit, onChange) {
    return (child, childNames) => {
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

/*
 * Standard cloning rule for something react-formable
 */
export function createFormableRule(
    { errors = [], fieldErrors = {} },
    onSubmit = identity,
    onChange = identity) {
    return {
        predicate: child => child.props && child.props.name,
        clone: (child, childNames) => {
            return React.cloneElement(
                child,
                getFormableComponentProperties(errors, fieldErrors, onSubmit, onChange)(child, childNames),
                child.props && child.props.children
            );
        }
    }
}

/**
 * Clones a child subtree using the supplied rules which are composed of predicates
 * and clone instructions.
 *
 * @param  {array} rules used to predicate and clone
 * @param  {Function} children The children to iterate over
 * @param  {array=} childNames optionally and ONLY supplied for internal recursion
 * @return {Object} The cloned children
 */
export default function cloneChildren(rules, children, childNames = []) {    
    return function () {
        if (children) {
            const cloneRules = [leafRule, ...rules, createRecursiveRule(rules)];

            return React.Children.map(children, (child) => {
                // find first rule that passes and use it to clone
                return cloneRules.find(rule => rule.predicate(child)).clone(child, childNames);
            });
        }
    }();
}
