export const title = 'Errors';
export const link = 'errors';

export const markdown = `
A component which soaks up and displays form errors. You can think of \`Errors\` like it is a placeholder. Wherever you place it, errors will be rendered there.

**NB**: Make sure to place this component *within* the \`Form\` tag.

| Property | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| scoped | boolean | false | **EXPERIMENTAL:** Only displays form errors in relation to the elements nearest parent |
| additionalErrors | array[string] | [] | Any additional errors you would want to render to the screen can be passed down as an array of strings. |
| renderError | function(error) => node | identity | If you want to overwrite how errors are rendered, you can do so by providing a callback to errors. This function will receive each error and will return what you want to be rendered as your error. |
`;
