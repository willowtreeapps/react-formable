import React, { PropTypes } from 'react';

/**
 * A component used to display the underlying data model of a react-formable™ form
 * (requires highlight.js)
 */
export default class FormData extends React.Component {

    render() {
        const formData = this.props.data ? JSON.stringify(this.props.data, null, 2) : '{}';

        return <div>
            <p>As you fill out the form you can see the model update below</p>
            <pre><code class="json">{formData}</code></pre>
        </div>;
    }

}

FormData.propTypes = {
    data: PropTypes.object.isRequired
};

FormData.defaultProps = {
    className: ''
};
