import React from 'react';
import BasicForm from './BasicForm';

export const title = 'Basic';
export const link = 'basic';

export const markdown = `Here is a simple form. It's got a couple of fields and a bit of validation, easy right?

The JSX to render the form looks like the following:

### The JSX

\`\`\`
<Form ref='form' onChange={this.onChange.bind(this)}
    onSubmit={this.onSubmit.bind(this)}>
    <Errors />
    <div>
        <label>First name *</label>
        <Input name='firstname' type='text'
            validators={[required('First name is required')]} />
    </div>
    <div>
        <label>Last name *</label>
        <Input name='lastname' type='text'
            validators={[required('Last name is required')]} />
    </div>
    <div>
        <label>Phone number</label>
        <Input name='phone' type='text' />
    </div>
    <div>
        <input type='submit' value='Submit' />
    </div>
</Form>
\`\`\`

`;

export const code = function () {
    return <BasicForm />
};
