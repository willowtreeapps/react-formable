/* tslint:disable */

import * as React from 'react';
import cloneChildren, { createErrorsRule, createFormableRule } from './helpers/cloneChildren';
import values from './helpers/values';
import { TObject, TLeaf } from './helpers/tree';
import AnyObject from './types/anyObject';
const warning = require('warning');

type FormableRef = any;

function isFormableRef(ref: any) {
    return ref && (ref.getInputs || ref.getValue);
}

export interface IFieldsetProps {
    errors?: string[];
    fieldErrors?: AnyObject;
    name: string;
    onChange?: () => void;
    onSubmit?: () => void;
}

export default class Fieldset extends React.Component<IFieldsetProps, {}> {
    constructor(props: IFieldsetProps) {
        super(props);
        this.getInputs = this.getInputs.bind(this);
    }

    public getInputs(): TObject<any> {
        const children = values(this.refs || {})
                            .filter(isFormableRef)
                            .reduce((memo, ref) => {
                                const refVal = ref.getInputs ? ref.getInputs() : TLeaf.of(ref);
                                memo[ref.props.name] = refVal;
                                return memo;
                            }, {});

        return TObject.of(this, children);
    }

    public render(): React.ReactElement<{}> {
        warning( this.props.name, `Fieldset found without a name prop. The children of this component will behave eratically` );
        const errorsRule = createErrorsRule(this.props.errors, this.props.fieldErrors);
        const formableRule = createFormableRule(
            this.props.errors,
            this.props.fieldErrors,
            this.props.onSubmit,
            this.props.onChange
        );

        const child: any = this.props.children;

        let props = this.props;
        delete props.errors;
        delete props.fieldErrors;
        delete props.name;

        return <div {...props}>
            {cloneChildren([errorsRule, formableRule], child)}
        </div>;
    }
}
