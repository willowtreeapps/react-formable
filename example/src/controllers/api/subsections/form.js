const markdown = `
The top level \`Form\` component is what serializes your data.

| Property | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| onChange| function(form) | undefined | A callback which will be called whenever any child input changes. Receives the serialized form object. |
| onSubmit | function(form) | undefined | A callback which will be called whenever the form is submitted. Receives the serialized form object. |
| showErrorsOnSubmit | boolean | true | A boolean to decide if errors should be shown on submit. |
| showErrorsOnChange | boolean(form) | false | A boolean to decide if errors should be shown on change. |
| validators | array[function(form)] | [] | An array of validators to run over the form. Useful to capture business logic. Not automatically bound to the form. |


There are a handful of methods on the \`Form\` component which are useful. To access these, attach a \`ref\` to the \`Form\` and call them via \`this.refs.refName.methodName();\`.

| Method | Params | Description |
| :----- | :----- | :---------- |
| serialize | | Returns the serialized form object. |
| showFieldErrors | | Passes down errors to inputs within the form. |
| clearFieldErrors | | Clears errors passed down to inputs within the form. |
`;

export const content = [markdown];
export const title = 'Form';
export const link = 'form';
