import React, { PropTypes } from 'react';
import MD  from './md';

/**
 * A component used to display the underlying data model of a react-formable™ form
 * (requires highlight.js)
 */
export default class JSONViewer extends React.Component {

    render() {
        const data = this.props.data || 'Start filling the form out';
        const mddata = '```json\n'
            + JSON.stringify(data, null, 2)
            + '\n```';

        return <MD text={mddata} />;
    }

}

JSONViewer.propTypes = {
    data: PropTypes.object.isRequired
};

JSONViewer.defaultProps = {
    data: 'Start typing'
};
