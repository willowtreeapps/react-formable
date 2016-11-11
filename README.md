# Formable


## Install
```
npm install --save react-formable@1.0.0-alpha-1
```

## What is included?

```ts
Formable = {
    Form,
    getBlankForm, // Returns a blank form object
    Fieldset,
    Fieldlist,
    Input,
    Errors,
    IForm, // Exporting this for now until we fix the typings issues
    normalizeInput,
    validators: {
        required,
        greaterThan,
        lessThan,
        maxLength,
        minLength,
        test,
        equalsField
    }
};
```

## API

Just dumping the interface files for component props here for now :joy:.

## Form serialization

These are the basic return values of form serialization. There are two options, an async version and a synchronous version (depending on the `delayOnSubmit` prop). When you use this interface, you must give it a type `T` which correlates to your `fieldValues` structure.

```ts
export interface IForm<T> {
    fieldValues: T;
    validation: Promise<IValidation>;
}

export interface IFormPromisless<T> {
    fieldValues: T;
    validation: IValidation;
}

export interface IValidation {
    fieldErrors: any;
    errors: any[];
    valid: boolean;
}
```

### Form

```ts
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
```

## Errors

For the most part you don't need to worry about displaying errors. Just render this component within your `Form` and your errors will display automatically. You can always pass down additional errors for example server responses.

```ts
interface IErrorsProps {
    errors?: string[];
    additionalErrors?: string[];
    fieldErrors?: any;
    scoped?: boolean;
    renderError?: (error: any) => void;
    className?: string;
}
```

## Input

A starting point for writing inputs.

```ts
interface IInputProps {
    name: string;
    fieldErrors?: string[];
    validateOnBlur?: boolean;
    value?: any;
    defaultValue?: any;
    validators?: any;
    onChange?: () => void;
    onSubmit?: () => void;
    className?: string;
}
```

## Fieldset

```ts
interface IFieldsetProps {
    name: string;
    errors?: string[];
    fieldErrors?: AnyObject;
    onChange?: () => void;
    onSubmit?: () => void;
}
```

## Fieldlist

```ts
interface IFieldlistProps {
    name: string;
    errors?: string[];
    fieldErrors?: AnyObject[];
}
```

## Normalize inputs

Sometimes you want to use stateless components, or perhaps you are using a third party input, or just a ton of decorators. `normalizeInput` is a helper function to make these scenarios play nicely with formable. Look at the [test](https://github.com/willowtreeapps/react-formable/blob/v1/src/__tests__/normalizeInput-test.js) for now for a better understanding of how it works.

```ts
type NormalizeOptions = {
    event?: string;
    getValueFromEvent?: (e: any) => any;
};

export default function normalizeInput(options?: NormalizeOptions, Component?: any): any {}
```

Here are two example usages:

```ts
// A simple stateless component
const Input1 = normalizeInput(props => <input {...props} />);

// A stateless component that defines a custom callback
const Input2 = normalizeInput(
    { getValueFromEvent: e => e },
    (props) => <input {...props} onChange={e => props.onChange(e.target.value)} />
);

// A decorated component, it needs to be at the top of the chain
@normalizeInput
@connect(/* ... */)
class Input5 extends React.Component<any, {}>  {
    public render(): React.ReactElement<{}> {
        return <input {...this.props} />;
    }
}
```
