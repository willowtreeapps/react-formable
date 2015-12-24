import React, { PropTypes } from 'react';
import MD  from './md';

/**
 * A component used to display the underlying data model of a react-formable™ form
 * (requires highlight.js)
 */
export default class JSONViewer extends React.Component {

    render() {
        const data = this.props.data ? JSON.stringify(this.props.data, null, 2) : 'Start filling the form out';
        const mddata = `\`\`\`json\n ${data} \n\`\`\``;

        return <MD text={mddata} />;
    }

}

JSONViewer.propTypes = {
    data: PropTypes.object.isRequired
};

JSONViewer.defaultProps = {
    data: 'Start typing'
};
