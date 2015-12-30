export const title = 'Equals Field';
export const link = 'Equals Field';

export const markdown = `
A validator that ensures an input value is equal to another field in the form.

\`\`\`js
const { equalsField } = require('react-formable').validators;
<Input name='password' validators={equalsField('password2', 'passwords must match')} ... />
\`\`\`

| Parameter | Type | Description |
| :------- | :--- | :---------- |
| Field Name | string | name of another field value that this value must match (nesting available using dot notation). |
| Error message | string | The error message returned is the supplied value does not match. |

`;
