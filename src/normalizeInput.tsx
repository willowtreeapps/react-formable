import * as React from 'react';

/* tslint:disable: typedef */

const makeComponent = (options, Component) => {
    return class NormalizedInput extends React.Component<any, { value: any }> {
        public state = { value: null };

        public getValue = () => this.state.value;

        private setValue = (e) => {
            this.setState({ value: options.getValueFromEvent(e) }, () => {
                // Make sure not to overide the default event
                if (this.props[options.event]) {
                    this.props[options.event](e);
                }

                // Make sure to call onChange (if it wasn't the default event)
                if (this.props.onChange && this.props.onChange !== this.props[options.event]) {
                    this.props.onChange(e);
                }
            });
        }

        public render() {
            const props = Object.assign({}, this.props, {
                [options.event]: this.setValue
            });

            return <Component {...props}/>;
        }
    };
};

type NormalizeOptions = {
    event?: string;
    getValueFromEvent?: (e: any) => any;
};

export default function normalizeInput(options?: NormalizeOptions, Component?: any): any {
    const defaultOptions: NormalizeOptions = {
        event: 'onChange',
        getValueFromEvent: e => e.target.value
    };

    if (typeof options === 'object') {
        if (!Component) {
            return (Comp) => makeComponent(Object.assign({}, defaultOptions, options), Comp);
        } else {
            return makeComponent(Object.assign({}, defaultOptions, options), Component);
        }
    } else {
        return makeComponent(defaultOptions, options);
    }
}
