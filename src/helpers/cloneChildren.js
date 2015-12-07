import React from 'react';

/**
 * Clones a child subtree, when we encounter a component that passes our
 * predicate pass it down additional props.
 *
 * @param  {Function} predicate A predicate function which recives the child
 * @param  {Function} getProps  A function which recives the component and
 * returns an object which gets merged into the props of the component
 * @return {Object} The cloned children
 */
export default function cloneChildren(predicate, getProps, children) {
    if (typeof children !== 'object' || children === null) {
        return children;
    }

    return React.Children.map(children, function (child) {
        if (typeof child !== 'object' || child === null) {
            return child;
        }

        if (predicate(child)) {
            return React.cloneElement(
                child,
                getProps(child),
                child.props && child.props.children
            );
        } else {
            return React.cloneElement(
                child,
                {},
                cloneChildren(predicate, getProps, child.props && child.props.children)
            );
        }
    });
};
