/* tslint:disable */

import * as React from 'react';
import values from './helpers/values';
import Fieldset from './fieldset';
import AnyObject from './types/anyObject';
const warning = require('warning');

interface IFieldlistProps {
    errors?: string[];
    fieldErrors?: AnyObject[];
    name: string;
}

export default class Fieldlist extends React.Component<IFieldlistProps, {}> {
    public refs: {
        [key: string]: React.ReactInstance;
        fieldset: Fieldset;
    };

    public constructor(props: IFieldlistProps) {
        super(props);
        this.getInputs = this.getInputs.bind(this);
    }

    public getInputs() {
        return {
            ref: this,
            refs: values(this.refs.fieldset.getInputs().refs)
                    .filter((node: any) => node.children && !!values(node.children).length)
        };
    }

    public render(): React.ReactElement<{}> {
        warning(this.props.name, `Fieldlist found without a name prop. The children of this component will behave eratically`);

        const errors = this.props.errors || [];
        const fieldErrors = this.props.fieldErrors || [];

        // Overwrite errors and fieldErrors passed in here as fieldset expects
        // different errors than fieldlist. There is no need to pass them down
        return <Fieldset {...this.props}
                         ref="fieldset"
                         errors={[]}
                         fieldErrors={{}}>
            {React.Children.map(this.props.children, (child, i) =>
                <Fieldset name={this.props.name+i}
                          errors={errors}
                          fieldErrors={fieldErrors[i]}>
                    {child}
                </Fieldset>
            )}
        </Fieldset>;
    }
}
