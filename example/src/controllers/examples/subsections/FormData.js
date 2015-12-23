import React, { PropTypes } from 'react';

/**
 * Takes the form payload and renders it's content in a pretty
 */
export default class FormData extends React.Component {

    render() {
        const jsonPayload = this.props.data ? JSON.stringify(this.props.data, null, 2) : "Start filling out the form";
        const styles = {
            fontFamily: "courier",
            width: 600
        }
        return <div style={styles}>
            <pre>{jsonPayload}</pre>
        </div>;
    }

}
