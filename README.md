# Formable


## Install

```
npm install --save react-formable@1.0.0-alpha-1
```

## What is included?

```
Formable = {
    Form,
    getBlankForm, // Returns a blank form object
    Fieldset,
    Fieldlist,
    Input,
    Errors,
    IForm, // Exporting this for now until we fix the typings issues
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

```
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

```
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

```
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

```
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

```
interface IFieldsetProps {
    name: string;
    errors?: string[];
    fieldErrors?: AnyObject;
    onChange?: () => void;
    onSubmit?: () => void;
}
```

## Fieldlist

```
interface IFieldlistProps {
    name: string;
    errors?: string[];
    fieldErrors?: AnyObject[];
}
```
