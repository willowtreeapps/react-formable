import * as React from 'react';
import omit from '../helpers/omit';

// TODO: Clean up the use of any here
/* tslint:disable: no-any */
type AnyType = any;
/* tslint:enable: no-any */

interface IInputDefaultProps {
    onChange?: (e: AnyType) => void;
    onSubmit?: () => void;
    className?: string;
}

/* tslint:disable: no-any */
export interface IInputProps extends IInputDefaultProps {
    name: string;
    fieldErrors?: string[];
    validateOnBlur?: boolean;
    value?: any;
    defaultValue?: any;
    validators?: any;
}
/* tslint:enable: no-any */

export default class Input extends React.Component<IInputProps, {}> {
    public static defaultProps: IInputDefaultProps = {
        onChange: (e: AnyType): void => void 0,
        onSubmit: (): void => void 0,
        className: ''
    };

    public refs: {
        [key: string]: React.ReactInstance;
        input: HTMLInputElement;
    };

    constructor(props: IInputProps) {
        super(props);
        this.getValue = this.getValue.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    public getValue(): AnyType {
        switch(this.refs.input.type) {
            case 'checkbox':
            case 'radio':
                return this.refs.input.checked;
            default:
                return this.refs.input.value;
        }
    }

    private onChange(e: AnyType): void {
        if(!this.props.validateOnBlur) {
            this.props.onChange(e);
        }
    }

    private onBlur(e: AnyType): void {
        if (this.props.validateOnBlur) {
            this.props.onChange(e);
        }
    }

    public render(): React.ReactElement<{}> {
        const hasError = this.props.fieldErrors && this.props.fieldErrors.length;
        const className = `${this.props.className} ${hasError ? 'error' : ''}`;

        const props = omit([
            'errors',
            'fieldErrors',
            'validateOnBlur',
            'validators'
        ], this.props);

        return <input {...props}
                      className={className}
                      onChange={this.onChange}
                      onBlur={this.onBlur}
                      ref="input" />;
    }
}
