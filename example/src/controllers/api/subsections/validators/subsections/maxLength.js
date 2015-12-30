export const title = 'Maximum Length';
export const link = 'Maximum Length';

export const markdown = `
A validator that ensures maximum legnth of a supplied value.

\`\`\`js
const { maxLength } = require('react-formable').validators;
<Input validators={maxLength(12, 'password must be at most 12 characters')} ... />
\`\`\`

| Parameter | Type | Description |
| :------- | :--- | :---------- |
| Maximum Length | number | The maximum possible length of the value. |
| Error message | string | The error message returned is the supplied value is too long. |

`;
