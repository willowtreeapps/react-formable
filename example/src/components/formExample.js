import React, { PropTypes } from 'react';
import JSONViewer from './JSONViewer';
import Code from './code';
import { getBlankForm } from 'react-formable';

export default React.createClass({
    propTypes: {
        code: PropTypes.string.isRequired,
        example: PropTypes.func.isRequired,
        className: PropTypes.string,
        showCode: PropTypes.bool
    },

    getDefaultProps() {
        return {
            className: ''
        };
    },

    getInitialState() {
        return {
            showCode: this.props.showCode || false,
            form: getBlankForm()
        };
    },

    render() {
        const Example = this.props.example;

        return <div className={`${this.props.className} code-example`}>
            <span className="a" onClick={() => this.setState({ showCode: !this.state.showCode })}>
                {this.state.showCode ? 'Show Result' : 'Show Code'}
            </span>

            {this.state.showCode && <Code>{this.props.code}</Code>}

            {!this.state.showCode && <div className="split">
                <div className="left">
                    <Example onChange={form => this.setState({ form })} />
                </div>
                <JSONViewer data={this.state.form} />
            </div>}
        </div>;
    }
});
