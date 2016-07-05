/* tslint:disable */

import * as React from 'react';
import uniq from './helpers/uniq';
import values from './helpers/values';
import cloneChildren, { createErrorsRule, createFormableRule } from './helpers/cloneChildren';
import tree, { TObject, TLeaf } from './helpers/tree';
import identity from './helpers/identity';

interface IForm {
    valid: boolean;
    fieldValues: any;
    fieldErrors: any;
    errors: any[];
}

export const getBlankForm = function getBlankForm(): IForm {
    return {
        valid: true,
        fieldValues: {},
        fieldErrors: {},
        errors: []
    };
};

const treeValue = function treeValue(tree) {
    return tree.map(value => value.getValue && value.getValue()).extract();
};

const getValidators = function getValidators(ref) {
    const propValidators = ref && ref.props && ref.props.validators || [];
    const refValidators = ref && ref.validators || [];

    return [].concat(propValidators, refValidators);
};

function isFormableRef(ref: any) {
    return ref && (ref.getInputs || ref.getValue);
}

interface IFormableProps {
    addValidationFieldErrors?: boolean;

    // Handlers for your form callbacks. These will be called with the
    // current serialization of the form
    onSubmit?: (form: IForm) => void;
    onChange?: (form: IForm) => void;

    showErrorsOnSubmit?: boolean;
    showErrorsOnChange?: boolean;

    validators?: any[];
}

interface IFormableState {
    fieldErrors: any;
    errors: any;
}

export default class Formable extends React.Component<IFormableProps, IFormableState> {
    public static defaultProps: IFormableProps = {
        onChange: function () {},
        onSubmit: function () {},
        showErrorsOnSubmit: true,
        showErrorsOnChange: false
    };

    constructor(props: IFormableProps) {
        super(props);

        this.serialize = this.serialize.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.showFieldErrors = this.showFieldErrors.bind(this);
        this.clearFieldErrors = this.clearFieldErrors.bind(this);

        this.state = {
            fieldErrors: {},
            errors: []
        };
    }

    private getInputs(): TObject<any> {
        const children = values(this.refs || {})
                            .filter(isFormableRef)
                            .reduce((memo, ref) => {
                                const refVal = ref.getInputs ? ref.getInputs() : TLeaf.of(ref);
                                memo[ref.props.name] = refVal;
                                return memo;
                            }, {});

        return TObject.of(this, children);
    }

    public serialize(): IForm {
        const formTree = this.getInputs();

        // Calculate how many times we should serialize in the case of
        // cycles when addValidationFieldErrors is true. We do this by
        // counting how many nodes are in our tree
        const refLength = formTree.map(() => 1).reduce((a,b) => a+b, 0);
        let iteration = 0;

        let form = getBlankForm();
        let oldForm = getBlankForm();

        do {
            // Keep a copy of the previous iteration of the form so we can
            // detect if the form is stable to exit early
            oldForm = Object.assign({}, form);

            // Gather our fieldValues from our tree
            form.fieldValues = treeValue(formTree);

            // Make a new temporary error tree. We will use this tree to
            // generate a nested object (fieldErrors) and again to reduce it
            // into an array (errors)
            const formTreeErrors = formTree
                .extend(tree => {
                    const validators = getValidators(tree.value);
                    const value = tree.value.getValue ? tree.value.getValue() : treeValue(tree);
                    const fieldValues = form.fieldValues;
                    const fieldErrors = this.props.addValidationFieldErrors ? oldForm.fieldErrors : null;

                    return validators
                            .map(fn => fn(value, fieldValues, fieldErrors))
                            .filter(identity);
                });

            form.fieldErrors = formTreeErrors.extract();
            form.errors = formTreeErrors
                            .reduce((acc, val) => {
                                return acc.concat(val);
                            }, []);

            iteration++;

        // If we don't need fieldErrors in our validators, we only need to
        // execute this do..while once. We need to loop because we don't have
        // explicit dependencies. We fake dependencies by making
        // an eventually stable tree.
        } while(
            this.props.addValidationFieldErrors &&
            iteration < refLength &&
            JSON.stringify(form) !== JSON.stringify(oldForm)
        );

        // Update valid here so our formValidators can make use of it
        form.errors = uniq(form.errors.filter(identity));
        form.valid = !form.errors.length;

        return form;
    }

    private onChange(): void {
        this.props.onChange(this.serialize());
        if (this.props.showErrorsOnChange) {
            this.showFieldErrors();
        }
    }

    private onSubmit(event: React.KeyboardEvent): void {
        event && event.preventDefault && event.preventDefault();
        if (this.props.showErrorsOnSubmit) {
            this.showFieldErrors();
        }
        this.props.onSubmit(this.serialize());
    }

    private onKeyDown(event: React.KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.onSubmit(event);
        }
    }

    public showFieldErrors(): any[] {
        const { fieldErrors, errors } = this.serialize();

        this.setState({ errors, fieldErrors });
        return errors;
    }

    public clearFieldErrors(): void {
        this.setState({
            fieldErrors: {},
            errors: []
        });
    }

    public render(): React.ReactElement<{}> {
        const errorsRule = createErrorsRule(this.state.errors, this.state.fieldErrors);
        const formableRule = createFormableRule(this.state.errors, this.state.fieldErrors, this.onSubmit, this.onChange);
        const children: any = this.props.children;

        return <form {...this.props}
                    ref="form"
                    onSubmit={this.onSubmit}
                    onChange={function () {}}
                    onKeyDown={this.onKeyDown}>
            {cloneChildren([errorsRule, formableRule], children)}
        </form>;
    }
}
