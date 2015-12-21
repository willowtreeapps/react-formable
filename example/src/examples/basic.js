export const code = `

`;

export const description = `
# This is a title

This is some test markedown. I guess you could say its pretty cool.

	import { Form, Input, Fieldset, Fieldlist, Errors } from 'react-formable';
	export default class App extends React.Component {
	    onChange(form) {
	        // The following are the same:
	        console.log(form);
	        console.log(this.refs.form.serialize());
	    }

		render() {
	        // You don't need to attach a ref to the form unless you want to
	        // call its methods directly.
	        return <Form ref="form" onChange={this.onChange}>
				<Input name="username" type="text" />
	        </Form>;
		}
	}

The form above would output the following JSON:
`;
