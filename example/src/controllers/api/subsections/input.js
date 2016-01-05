const markdown = `
To integrate inputs with \`Form\`s, you need to ensure two things.

1. The input has a \`getValue\` method. This method returns the current value of the input.
2. The input has to be able to work with your \`refs\`. cUnfortunately, this means nostateless components.

| Property | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| value | string | undefined | The value of the field. |
| validators |array[function(value, fieldValues, fieldErrors, subtreeErrors)] | [] | An array of validators to run over the input. |
| name | string | undefined | The name of the field which will get serialized. This will get copied over as \`ref\`. This means \`name\` _must be unique_, otherwise you will run into collisions. |
| fieldErrors | array[string] | [] | An array of string errors to pass down to the input. This is automatically filled via the form. You can overwrite this field if you want to manually show an error on an input. |
| validateOnBlur | boolean | false | A boolean which forces the field to wait until it fires a blur event to trigger form validation. |
`;

export const content = [markdown];
export const title = 'Input';
export const link = 'input';
