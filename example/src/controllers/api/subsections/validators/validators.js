import * as Required from './subsections/required';
import * as Test from './subsections/test';
import * as LessThan from './subsections/lessThan';
import * as GreaterThan from './subsections/greaterThan';
import * as MinLength from './subsections/minLength';
import * as MaxLength from './subsections/maxLength';
import * as EqualsField from './subsections/equalsField';

export const subsections = [
    Required,
    Test,
    LessThan,
    GreaterThan,
    MinLength,
    MaxLength,
    EqualsField
];

const markdown = `
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

These functions have the following call signatures. Note, \`fieldErrors\` will only be present if \`addValidationErrors\` is true on the \`Form\` component. \`fieldErrors\` and \`fieldValues\` are the values you recive when serialize the form.

| Component | Params | Description |
| :----- | :----- | :---------- |
| Inputs | value: Number String Boolean, fieldValues: Object, fieldErrors? : Object | Here the value is the input's value |
| Fieldset | value: Object, fieldValues: Object, fieldErrors?: Object | A fieldset recives a value of all its children in object form |
| Fieldlist | value: Array, fieldValues: Object, fieldErrors?: Object | A fieldlist recives a value of a list of its children |
| Form | value: Object, fieldValues: Object, fieldErrors?: Object | Value here is all the values within the form |

Returning a message from a validator indicates a fail. Returning nothing indicates a pass.

\`react-formable\` supplies some common use-case stock validators which you can import and use list below.
`;

export const content = [markdown];
export const title = 'Validators';
export const link = 'Validators';
