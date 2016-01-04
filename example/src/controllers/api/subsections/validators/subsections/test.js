const markdown = `
A validator that ensures the input value meets the specified regex.

\`\`\`js
const { test } = require('react-formable').validators;
<Input validators={test(/(^\d{5}$)/, 'must supply zip code')} ... />
\`\`\`

| Parameter | Type | Description |
| :------- | :--- | :---------- |
| Regexp | string/regex | The regex that the value must match. |
| Error message | string | The error message to be returned is the supplied value is missing. |

`;

export const content = [markdown];
export const title = 'Regex';
export const link = 'Regex';
