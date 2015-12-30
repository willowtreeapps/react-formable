export const title = 'Fieldlist';
export const link = 'fieldlist';

export const markdown = `
\`Fieldlist\` uses \`Fieldset\` under the hood to render each *direct* child it owns. This means if you nest \`Fieldset\`s within a \`Fieldlist\`, you will get some extra objects floating around. Similarly to \`Fieldset\`, validators return the subtree that the \`Fieldlist\` represents.

| Property | Type | Default| Description |
| :------- | :--- | :----- | :---------- |
| validators | array[function(value, fieldValues, fieldErrors, subtreeErrors)] | [] | An array of validators to run over the input. |
| name | string | undefined | The name of the field which will get serialized. This will get copied over as \`ref\`. This means \`name\` _must be unique_, otherwise you will run into collisions. |
`;
