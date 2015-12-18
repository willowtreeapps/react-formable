import React, { PropTypes } from 'react';
import keys from './helpers/keys';
import uniq from './helpers/uniq';
import values from './helpers/values';
import identity from './helpers/identity';
import cloneChildren from './helpers/cloneChildren';
import pick from './helpers/pick';
import omit from './helpers/omit';
import compose from './helpers/compose';
import warning from 'warning';

export const getBlankForm =function getBlankForm() {
    return {
        valid: true,
        fieldValues: {},
        fieldErrors: {},
        errors: []
    };
};

export const deNestErrors = function deNestErrors(errors) {
    // Our base case, strings or nulls
    if (!errors || typeof errors === 'string')
        return errors;

    // Arrays are objects, so we have to check arrays first
    // Iterate over each value in our array and denest it. Combine all These
    // results into one array and return it
    if (errors.constructor === Array)
        return [].concat.apply([], errors.map(val => deNestErrors(val)));

    // Iterate over each value within our object and denest them
    if (typeof errors === 'object')
        return deNestErrors(values(errors));

    // Fallback in case something real weird happens
    return errors;
}

const nodeToValues = function nodeToValues(node) {
    // Whoops, bad things happening
    if (!node) return node;

    // We are either starting off or not at a leaf yet. Regardless traverse
    // the path downwards until we hit a leaf
    if (node.constructor === Array) {
        return node.reduce((memo, currentNode) => {
            memo[currentNode.ref.props.name] = nodeToValues(currentNode);
            return memo;
        }, {});
    }

    if (node.refs && node.refs.constructor === Array) {
        return node.refs.map(r => nodeToValues(r));
    }

    if (node.refs && typeof node.refs === 'object') {
        return values(node.refs).reduce((memo, currentNode) => {
            memo[currentNode.ref.props.name] = nodeToValues(currentNode);
            return memo;
        }, {});
    }

    // We are at a leaf, give our value back
    return node.ref.getValue();
}

// node: The current node we are looking at { ref: Object, refs?: Object|Array }
// treeValues: The current value / object in the tree
// treeErrors: The current array of errors / object of errors in the tree
// form: The overall form
// returns { fieldErrors: Object, errors: array }
const toErrors = function toErrors(node, treeValues, treeErrors={}, form) {
    // Something bad is happening here
    if (!node) return node;

    // The initial call to this function is an array of nodes
    if (node.constructor === Array) {
        let errors = [];

        const fieldErrors = node.reduce((memo, currentNode) => {
            const name = currentNode.ref.props.name;
            const childResult = toErrors(currentNode, treeValues[name], treeErrors[name], form);

            memo[name] = childResult.fieldErrors;
            errors = errors.concat(childResult.errors);
            return memo;
        }, {});

        return { fieldErrors, errors };
    }

    // We want to get errrors from the bottom up. To do this we start by always
    // getting the errors for our children first. Once we have our childrens
    // errors, we validate ourselves against our children. Lastly, we return the
    // result of these checks

    // These will be our return types:
    // fieldErrors: Object | Array (depending on the type of node.refs) If
    // node.refs doesn't exist it means we are a leaf and will have an array of
    // strings
    let fieldErrors;
    // errors: Array (always)
    let errors = [];

    // Here we have children, we are not a leaf
    if (node.refs) {
        if (node.refs.constructor === Array) {
            fieldErrors = node.refs.map((currentNode, i) => {
                const childResult = toErrors(currentNode, treeValues[i], treeErrors[i], form);

                errors = errors.concat(childResult.errors);
                return childResult.fieldErrors;
            });
        } else {
            // Iterate over each child. And add our child errors to our errors
            fieldErrors = values(node.refs).reduce((memo, currentNode) => {
                const name = currentNode.ref.props.name;
                const childResult = toErrors(currentNode, treeValues[name], treeErrors[name], form);

                memo[name] = childResult.fieldErrors;
                errors = errors.concat(childResult.errors);
                return memo;
            }, {});
        }
    }

    // Get our current node's validators. They can be on props or this
    const validators = [].concat(
        node.ref.props.validators || [],
        node.ref.validators || []
    );
    // Validate the current node
    const validationErrors = validators
                                .map(validator => validator.call(
                                    node.ref,
                                    treeValues,
                                    form.fieldValues,
                                    form.fieldErrors,
                                    treeErrors
                                ))
                                .filter(identity);

    errors = errors.concat(validationErrors);


    // Our field errors will either be our childrens fieldErrors (if we have
    // children) or our validation errors
    fieldErrors = fieldErrors || validationErrors;

    return { fieldErrors, errors };
}


export default React.createClass({
    displayName: 'Form',

    propTypes: {
        circular: PropTypes.bool,

        // Handlers for your form callbacks. These will be called with the
        // current serialization of the form
        onSubmit: PropTypes.func,
        onChange: PropTypes.func,

        showErrorsOnSubmit: PropTypes.bool,
        showErrorsOnChange: PropTypes.bool,

        // Default React children prop
        children: PropTypes.node
    },

    getDefaultProps() {
        return {
            onChange: function () {},
            onSubmit: function () {},
            showErrorsOnSubmit: true,
            showErrorsOnChange: false
        };
    },

    getInitialState() {
        return {
            fieldErrors: {},
            errors: []
        };
    },

    serialize() {
        let iteration = 0;
        // TODO: Lolololol
        const refLength = 20;

        // Build the object of inputs
        const nodes = values(this.refs || {})
                .filter(ref => (ref.getInputs || ref.getValue))
                .map(ref => ref.getInputs ? ref.getInputs() : { ref });

        let form = getBlankForm();
        let oldForm = getBlankForm();

        do {
            // Keep a copy of the previous iteration of the form so we can
            // detect if the form is stable to exit early
            oldForm = Object.assign({}, form);
            form.fieldValues = nodeToValues(nodes);
            const { fieldErrors, errors } = toErrors(
                nodes,
                form.fieldValues,
                form.fieldErrors,
                form
            );

            form.fieldErrors = fieldErrors;
            form.errors = uniq(errors);
            iteration++;
        } while(
            this.props.circular &&
            iteration < refLength &&
            JSON.stringify(form) !== JSON.stringify(oldForm)
        );

        form.valid = !form.errors.length;

        return form;
    },

    onChange() {
        this.props.onChange(this.serialize());
        if (this.props.showErrorsOnChange) {
            this.showFieldErrors();
        }
    },

    onSubmit(event) {
        event && event.preventDefault && event.preventDefault()
        if (this.props.showErrorsOnSubmit) {
            this.showFieldErrors();
        }
        this.props.onSubmit(this.serialize());
    },

    onKeyDown(event) {
        if (event.key === 'Enter') {
            this.onSubmit(event);
        }
    },

    showFieldErrors() {
        const { fieldErrors, errors } = this.serialize();

        this.setState({ errors, fieldErrors });
        return errors;
    },

    clearFieldErrors() {
        this.setState({
            fieldErrors: {},
            errors: []
        });
    },

    render() {
        // Define our helpers for cloneing our children
        let childNames = [];
        const clonePred = child => child.props && child.props.name || child.type.displayName === 'Errors';
        const cloneProps = child => {
            if (child.type.displayName === 'Errors') {
                return {
                    errors: this.state.errors,
                    fieldErrors: this.state.fieldErrors
                };
            }

            warning(!child.ref, `Attempting to attach ref "${child.ref}" to "${child.props.name}" will be bad for your health`);
            warning(childNames.indexOf(child.props.name) === -1, `Duplicate name "${child.props.name}" found. Duplicate fields will be ignored`);
            childNames = childNames.concat(child.props.name);

            return {
                ref: child.ref || child.props.name,
                onChange: compose(child.props.onChange || identity, this.onChange),
                onSubmit: compose(child.props.onSubmit || identity, this.onSubmit),
                errors: this.state.errors,
                fieldErrors: child.props.fieldErrors || this.state.fieldErrors[child.props.name]
            };
        };

        return <form {...this.props}
                    ref="form"
                    onSubmit={this.onSubmit}
                    onChange={function () {}}
                    onKeyDown={this.onKeyDown}>
            {cloneChildren(clonePred, cloneProps, this.props.children)}
        </form>;
    }
});
