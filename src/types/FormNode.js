// @flow

export type Validator = (value: ?any, fieldValues: any) => any

export type FormNode = {
    name: string,
    path: string,
    key: ?string,
    value: ?any,
    defaultValue: ?any,
    getValue: () => any,
    validators: Validator[],
    fieldErrors: any[]
}
