export const title = 'Minimum Length';
export const link = 'Minimum Length';

export const markdown = `
A validator that ensures minimum legnth of a supplied value.

\`\`\`js
const { minLength } = require('react-formable').validators;
<Input validators={minLength(8, 'password must be at least 8 characters')} ... />
\`\`\`

| Parameter | Type | Description |
| :------- | :--- | :---------- |
| Minimum Length | number | The minimum possible length of the value |
| Error message | string | The error message returned is the supplied value is too small |

`;
