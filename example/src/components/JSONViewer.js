import React, { PropTypes } from 'react';
import MD  from './md';

/**
 * A component used to pretty display JSON using Markdown
 */
export default class JSONViewer extends React.Component {

    render() {
        const data = JSON.stringify(this.props.data, null, 2);
        const mddata = `\`\`\`json\n ${data} \n\`\`\``;

        return <MD text={mddata} />;
    }

}

JSONViewer.propTypes = {
    data: PropTypes.object.isRequired
};

JSONViewer.defaultProps = {
    data: 'Empty object'
};
