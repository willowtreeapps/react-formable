import React, { PropTypes } from 'react';
import Page from '../../components/page';
import * as FormWalkThrough from './subsections/form-walk-through';
import * as AddingValidation from './subsections/adding-validation';
import * as DisplayErrors from './subsections/displaying-errors';
import * as CreatignInputs from './subsections/creating-inputs';
import * as ReusableFormSections from './subsections/reusable-form-sections';
import * as HighorderForms from './subsections/highorder-forms';
import * as Fieldset from './subsections/fieldset';
import * as Fieldlist from './subsections/fieldlist';

const subsections = [
    FormWalkThrough,
    Fieldset,
    Fieldlist,
    AddingValidation,
    DisplayErrors,
    CreatignInputs,
    ReusableFormSections,
    HighorderForms
];

export default React.createClass({
    propTypes: {
        children: PropTypes.node,
        setSublinks: PropTypes.func,
        setActiveSublink: PropTypes.func
    },

    componentWillMount() {
        this.props.setSublinks(subsections);
        window.scrollTo(0,0);
    },

    render() {
        return <Page className="guides"
                     subsections={subsections}
                     setActiveSublink={this.props.setActiveSublink} />
    }
});
