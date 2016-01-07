import React, { PropTypes } from 'react';
import Page from '../../components/page';
import * as Basic from './subsections/basic';
import * as Signup from './subsections/signup';
import * as Fieldset from './subsections/fieldset';

const subsections = [
    Basic,
    Signup,
    Fieldset
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
        return <Page title="Examples"
                     className="examples"
                     subsections={subsections} />
    }
});
