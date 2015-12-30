export const title = 'Greater Than';
export const link = 'Greater Than';

export const markdown = `
A validator that ensures an input value is greater than pre-specified number.

\`\`\`js
const { greaterThan } = require('react-formable').validators;
<Input validators={greaterThan(5, 'value must be greater than 5')} ... />
\`\`\`

| Parameter | Type | Description |
| :------- | :--- | :---------- |
| floor | number | The number that values must be greater than. |
| Error message | string | The error message returned is the supplied value is too small. |

`;
