import React, { PropTypes } from 'react';

/**
 * A component used to display the underlying data model of a react-formable™ form
 * (requires highlight.js)
 */
export default class JSONViewer extends React.Component {

    render() {
        const data = this.props.data ? JSON.stringify(this.props.data, null, 2) : '{}';

        return <div>
            <p>As you fill out the form you can see the model update below</p>
            <pre><code class="json">{data}</code></pre>
        </div>;
    }

}

JSONViewer.propTypes = {
    data: PropTypes.object.isRequired
};
