import React, { PropTypes } from 'react';
import JSONViewer from './JSONViewer';
import { getBlankForm } from 'react-formable';

export default React.createClass({
    propTypes: {
        code: PropTypes.string.isRequired,
        example: PropTypes.func.isRequired,
        className: PropTypes.string
    },

    getDefaultProps() {
        return {
            className:''
        };
    },

    getInitialState() {
        return {
            showCode: true,
            form: getBlankForm()
        };
    },

    render() {
        const Example = this.props.example;
        const code = <pre dangerouslySetInnerHTML={{ __html: window.hljs.highlightAuto(this.props.code).value }} />;

        return <div className={`${this.props.className} code-example`}>
            <span className="a" onClick={() => this.setState({ showCode: !this.state.showCode})}>
                Toggle
            </span>

            {this.state.showCode && code}

            {!this.state.showCode && <div className="split">
                <div className="left">
                    <Example onChange={form => this.setState({ form })} />
                </div>
                <JSONViewer data={this.state.form} />
            </div>}
        </div>;
    }
});

