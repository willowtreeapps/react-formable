/* tslint:disable */

import * as React from 'react';
import cloneChildren, { createErrorsRule, createFormableRule } from './helpers/cloneChildren';
import values from './helpers/values';
import tree from './helpers/tree';
import AnyObject from './types/anyObject';
const warning = require('warning');

type FormableRef = any;

function isFormableRef(ref: any): ref is number {
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

    public getInputs() {
        return {
            ref: this,
            refs: values(this.refs || {})
                    .filter(isFormableRef)
                    .map((ref: FormableRef) => ref.getInputs ? ref.getInputs() : { ref })
                    .map(x => tree(x.ref, x.refs))
                    .reduce((memo, node) => {
                        memo[node.value.props.name] = node;
                        return memo;
                    }, {})
        };
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

        return <div {...this.props}>
            {cloneChildren([errorsRule, formableRule], child)}
        </div>;
    }
}
