import React, { PropTypes } from 'react';

/**
 * Takes the form payload and renders it's content in a pretty
 */
export default class FormData extends React.Component {

    render() {
        const jsonPayload = JSON.stringify(this.props.data, null, 2);

        return <div>
            <pre>{jsonPayload}</pre>
        </div>;
    }

}
