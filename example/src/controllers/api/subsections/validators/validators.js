import * as Required from './subsections/required';
import * as Test from './subsections/test';
import * as LessThan from './subsections/lessThan';
import * as GreaterThan from './subsections/greaterThan';
import * as MinLength from './subsections/minLength';
import * as MaxLength from './subsections/maxLength';

export const subSections = [
    Required,
    Test,
    LessThan,
    GreaterThan,
    MinLength,
    MaxLength
];

export const title = 'Validators';
export const link = 'Validators';

export const markdown = `
A validator is a function that can be supplied to a \`<Input />\`, \`<Fieldset />\` \`<Fieldlist />\` or a \`<Form />\`. These validators will run against with the supplied form value(s) to determine the validity of the component.

A validator is supplied via the property \`validators\` which expects an array of functions like the one below which checks the user has typed \`red\`.

\`\`\`js
<Input name="red" type="text"
       validators={[
           (value) => {
               if (value === 'red') {
                   return 'Hosuton we have a problem';
               }
           }
       ]} />
\`\`\`

Returning a message from a validator indicates a fail. Returning nothing indicates a pass.

\`react-formable\` supplies some common use-case stock validators which you can import and use list below.
`;
