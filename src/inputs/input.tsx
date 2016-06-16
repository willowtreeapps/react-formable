import * as React from 'react';

interface IInputDefaultProps {
    onChange: () => void;
    onSubmit: () => void;
    className: string;
}

export interface IInputProps extends IInputDefaultProps {
    fieldErrors: string[];
    validateOnBlur: boolean;
}

// TODO: Clean up the use of any here
/* tslint:disable: no-any */
type AnyType = any;
/* tslint:enable: no-any */

export default class Input extends React.Component<IInputProps, {}> {
    public static defaultProps: IInputDefaultProps = {
        onChange: (): void => void 0,
        onSubmit: (): void => void 0,
        className: ''
    };

    public refs: {
        [key: string]: React.ReactInstance;
        input: HTMLInputElement;
    };

<<<<<<< Updated upstream
=======
    constructor(props: IInputProps) {
        super(props);
        this.getValue = this.getValue.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

>>>>>>> Stashed changes
    public getValue(): AnyType {
        return this.refs.input.value;
    }

    private onChange(e: AnyType): void {
        if(!this.props.validateOnBlur) {
            this.props.onChange();
        }
    }

    private onBlur(): void {
        if (this.props.validateOnBlur) {
            this.props.onChange();
        }
    }

    public render(): React.ReactElement<{}> {
        const hasError = this.props.fieldErrors && this.props.fieldErrors.length;
        const className = `${this.props.className} ${hasError ? 'error' : ''}`;

        return <input {...this.props}
                      className={className}
                      onChange={this.onChange}
                      onBlur={this.onBlur}
                      ref="input" />;
    }
}
