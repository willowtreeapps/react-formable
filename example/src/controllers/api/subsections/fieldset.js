export const title = 'Fieldset';
export const link = 'fieldset';

export const markdown = `
\`Fieldset\`s are where most of the magic happens. They let us group together similar fields into smaller bite-sized objects. We can use these within individual forms, or make reusable form components and use them all over the place.

One important thing to understand: \`Fieldset\`s will always make an object with the \`name\` provided. If you use a \`Fieldset\` within a \`Fieldlist\`, you will have a nested object with the name of the \`Fieldset\`.

One last thing to keep in mind: you can attach validators to \`Fieldset\`s. Instead of a primitive passed down as the first param, it will be the subtree that the \`Fieldset\` represents. Any errors returned from a \`Fieldset\`s validators will skip \`fieldErrors\` and go directly to \`errors\`.

| Property | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| validators |array[function(value, fieldValues, fieldErrors, subtreeErrors)] | [] | An array of validators to run over the input. |
| name | string | undefined | The name of the field which will get serialized. This will get copied over as \`ref\`. This means \`name\` _must be unique_, otherwise you will run into collisions. |

`;
