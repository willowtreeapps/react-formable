import React, { PropTypes } from 'react';
import Page from '../../components/page';
import * as Form from './subsections/form';
import * as Fieldset from './subsections/fieldset';
import * as Fieldlist from './subsections/fieldlist';
import * as Input from './subsections/input';
import * as Errors from './subsections/errors';
import * as Validators from './subsections/validators/validators';

const subsections = [
    Form,
    Fieldset,
    Fieldlist,
    Input,
    Errors,
    Validators
];

export default React.createClass({
    propTypes: {
        children: PropTypes.node,
        setSublinks: PropTypes.func
    },

    componentWillMount() {
        this.props.setSublinks(subsections);
        window.scrollTo(0,0);
    },

    render() {
        return <Page title="API"
                     className="api"
                     subsections={subsections} />
    }
});
