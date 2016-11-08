/* tslint:disable */

import * as React from 'react';
import uniq from './helpers/uniq';
import values from './helpers/values';
import cloneChildren, { createErrorsRule, createFormableRule } from './helpers/cloneChildren';
import { TObject, TLeaf } from './helpers/tree';
import promiseEvery from './helpers/promiseEvery';
import identity from './helpers/identity';
import omit from './helpers/omit';

export interface IValidation {
    fieldErrors: any;
    errors: any[];
    valid: boolean;
}

export interface IFormPromisless<T> {
    fieldValues: T;
    validation: IValidation;
}

export interface IForm<T> {
    fieldValues: T;
    validation: Promise<IValidation>;
}

export function getBlankForm(): IForm<any> {
    return {
        fieldValues: {},
        validation: Promise.resolve({ fieldErrors: {}, errors: [], valid: true })
    };
};

function treeValue(tree) {
    return tree.map(value => value.getValue && value.getValue()).extract();
};

function getValidators(ref) {
    const propValidators = ref && ref.props && ref.props.validators || [];
    const refValidators = ref && ref.validators || [];

    return [].concat(propValidators, refValidators);
};

function isFormableRef(ref) {
    return ref && (ref.getInputs || ref.getValue);
}

interface IFormableProps<T> {
    addValidationFieldErrors?: boolean;

    // Handlers for your form callbacks. These will be called with the
    // current serialization of the form
    onChange?: (form: IForm<T>) => void;
    onSubmit?: {
        (form: IForm<T>): void;
        (form: IFormPromisless<T>): void;
    };

    showErrorsOnSubmit?: boolean;
    showErrorsOnChange?: boolean;

    // If you don't want to deal with promises, you can set this to true
    // and validation will be passed instead of promises
    delayOnSubmit?: boolean;

    validators?: any[];
}

interface IFormableState {
    fieldErrors: any;
    errors: any;
}

export default class Formable<T> extends React.Component<IFormableProps<T>, IFormableState> {
    public static defaultProps: IFormableProps<any> = {
        onChange: function () {},
        onSubmit: function () {},
        showErrorsOnSubmit: true,
        showErrorsOnChange: false
    };

    constructor(props: IFormableProps<T>) {
        super(props);

        this.serialize = this.serialize.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.showFieldErrors = this.showFieldErrors.bind(this);
        this.clearFieldErrors = this.clearFieldErrors.bind(this);
        this.validateTree = this.validateTree.bind(this);

        this.state = {
            fieldErrors: {},
            errors: []
        };
    }

    private getTree(): TObject<any> {
        const children = values(this.refs || {})
                            .filter(isFormableRef)
                            .reduce((memo, ref) => {
                                const refVal = ref.getInputs ? ref.getInputs() : TLeaf.of(ref);
                                memo[ref.props.name] = refVal;
                                return memo;
                            }, {});

        return TObject.of(this, children);
    }

    private validateTree(validationTree, fieldValues, errorObject?) {
        return validationTree
            // Map over the validators and invoke them
            .map(({ validators, value }) => {
                const fieldErrors = this.props.addValidationFieldErrors ? errorObject && errorObject.fieldErrors : null;
                return promiseEvery(validators.map(fn => fn(value, fieldValues, fieldErrors)));
            })
            // Convert the tree to a promise
            .sequence()
            // Wait for the results
            .then(treeErrors => {
                const filteredErrors = treeErrors.map(errs => errs.filter(identity));
                const allErrors = filteredErrors.reduce((acc, val) => acc.concat(val), []);
                const errors = uniq(allErrors);
                //TODO: Does this still incorporate form level errors here?

                return {
                    errors,
                    fieldErrors: filteredErrors.extract(),
                    valid: !errors.length
                };
            })
            .then(_errorObject => {
                if (!this.props.addValidationFieldErrors) {
                    return _errorObject;
                }

                if (JSON.stringify(_errorObject) === JSON.stringify(errorObject)) {
                    return _errorObject;
                }

                return this.validateTree(validationTree, fieldValues, _errorObject);
            });
    }

    public serialize(): IForm<T> {
        const formTree = this.getTree();
        const fieldValues = treeValue(formTree);

        // Make a tree we can re-use which doesn't hit
        // the DOM for use in validation
        const validationTree = formTree.extend(tree => {
            // Get the current validators for the current tree node
            const validators = getValidators(tree.value);
            // Get the value of the node / sub tree
            const value = tree.value.getValue ? tree.value.getValue() : treeValue(tree);

            return { validators, value };
        });

        const validation = this.validateTree(validationTree, fieldValues);

        return {
            fieldValues,
            validation
        };
    }

    private onChange(): void {
        const form = this.serialize();
        this.props.onChange(form);
        if (this.props.showErrorsOnChange) {
            this.showFieldErrors(form);
        }
    }

    private onSubmit(event: React.KeyboardEvent): void {
        event && event.preventDefault && event.preventDefault();
        const form = this.serialize();

        if (this.props.showErrorsOnSubmit) {
            this.showFieldErrors(form);
        }

        if (this.props.delayOnSubmit) {
            const { fieldValues, validation } = form;
            validation.then(errorObject => this.props.onSubmit({ fieldValues, validation: errorObject }));
        } else {
            this.props.onSubmit(form);
        }
    }

    private onKeyDown(event: React.KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.onSubmit(event);
        }
    }

    public showFieldErrors(form: IForm<T>): Promise<IValidation> {
        return form.validation.then(errorObject => {
            const { fieldErrors, errors } = errorObject;
            this.setState({ errors, fieldErrors });
            return errorObject;
        });
    }

    public clearFieldErrors(): void {
        this.setState({
            fieldErrors: {},
            errors: []
        });
    }

    public render(): React.ReactElement<{}> {
        const errorsRule = createErrorsRule(this.state.errors, this.state.fieldErrors);
        const formableRule = createFormableRule(
            this.state.errors,
            this.state.fieldErrors,
            this.onSubmit,
            this.onChange
        );
        const children: any = this.props.children;

        const props = omit([
            'addValidationFieldErrors',
            'onChange',
            'showErrorsOnSubmit',
            'showErrorsOnChange',
            'delayOnSubmit',
            'validators'
        ], this.props);

        return <form {...props}
                    ref="form"
                    onSubmit={this.onSubmit}
                    onChange={function () {}}
                    onKeyDown={this.onKeyDown}>
            {cloneChildren([errorsRule, formableRule], children)}
        </form>;
    }
}
