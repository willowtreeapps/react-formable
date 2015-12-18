import React, { PropTypes } from 'react';
import identity from './helpers/identity';
import flatten from './helpers/flatten';
import values from './helpers/values';

export default React.createClass({
    displayName: 'Errors',

    propTypes: {
        errors: PropTypes.arrayOf(PropTypes.string),
        fieldErrors: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ]),
        additionalErrors: PropTypes.arrayOf(PropTypes.string),
        scoped: PropTypes.bool,
        renderError: PropTypes.func
    },

    getDefaultProps() {
        return {
            errors: [],
            additionalErrors: [],
            fieldErrors: [],
            scoped: false,
            renderError: identity
        };
    },

    render() {
        const { errors, additionalErrors, scoped } = this.props;

        const fieldErrors = flatten(values(this.props.fieldErrors))
                                .filter(s => typeof s === 'string');

        const allErrors = [].concat(scoped ? fieldErrors : errors)
                            .concat(additionalErrors);

        return <ul className="errors" {...this.props}>
            {allErrors.map((error, i) =>
                <li key={i}> {this.props.renderError(error)} </li>)}
        </ul>;
    }
});
