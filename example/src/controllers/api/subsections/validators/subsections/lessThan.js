export const title = 'Less Than';
export const link = 'Less Than';

export const markdown = `
A validator that ensures an input value is less than a pre-specified number.

\`\`\`js
const { lessThan } = require('react-formable').validators;
<Input validators={lessThan(5, 'value must be less than 5')} ... />
\`\`\`

| Parameter | Type | Description |
| :------- | :--- | :---------- |
| ceiling | number | The number that values must be less than. |
| Error message | string | The error message returned is the supplied value is too big. |

`;
