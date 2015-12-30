export const title = 'Required';
export const link = 'Required';

export const markdown = `
A validator that ensures an input value is supplied. Null, undefined, empty string (whitespace) or empty object \`{}\` are all considered missing.

\`\`\`js
const { required } = require('react-formable').validators;
<Input validators={required('field is required')} ... />
\`\`\`

| Parameter | Type | Description |
| :------- | :--- | :---------- |
| Error message | string | The error message to be returned is the supplied value is missing. |

`;
