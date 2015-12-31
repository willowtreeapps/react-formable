We now know how to validate fields but how do we show these error messages to the screen? With react-formable, there are numerous ways we can display errors.

### Inline errors

It is pretty standard to draw attention to fields when they have errors. This could mean outlining the field in red, putting an asterisks next to it, or perhaps even a tooltip. To accomplish this, the `Form` component passes down an array of strings called `fieldErrors` to each named input (or an object / array for `Fieldset` / `Fieldlist`). It is then up to the component to decide what to do with these errors.

The `Input` component bundled with react-formable appends a className of `"error"` to the component when errors are present. This can be used to style the input accordingly. If you want to display errors next to fields making a new input is as simple as can be. We will detail that later in this guide.

Forms by default show field level errors whenever the form is submitted. This can be toggled on and off via the `showErrorsOnSubmit` which defaults to `true`. There is also a prop `showErrorsOnChange` to control if field errors should be passed down `onChange`.

### Lists of errors

More common perhaps is to show a unified list of errors near the submit button of the form. If we wanted to do this by hand, we would have to have some state on our component which keeps track of the errors output by the form. When we submit the form, we set the state and re-render the view with the errors. In practice, this happens in nearly every form you will make. To DRY up our code, there is an `<Errors />` component that does this for us.

```js
import Form, { Input, Errors } from 'react-formable';

function PersonForm(props) {
	return <Form onSubmit={onSubmit}>
		<label>
			Name:
			<Input name="name"
				   type="text"
				   validators={[
					   required('Please supply a name.')
				   ]}/>
		</label>
		<label>
			Age:
			<Input name="age"
				   type="text"
				   validators={[
					   required('Please supply an age')
				   ]}/>
		</label>
		<Errors />
		<button>Submit</button>
	</Form>;
}
```

We can think of `<Errors />` as a placeholder. The component will render a list of errors wherever we place it. We can control how they render via its `renderError` prop. This prop takes in a function with a parameter of a string. Whatever we return from this function will be rendered in our list.

What about server errors? We can pass down `additionalErrors` to the component to render arbitrary errors. For example:


```js
import Form, { Input, Errors } from 'react-formable';

const ErrorForm = React.createClass({
	getInitialState() {
		return { errors: [] };
	},

	onSubmit(form) {
		if (!form.valid) return;
		ajax.get('/api/users', form.fieldValues)
			.then((data) => /* process the data */)
			.catch((errors) => this.setState({ errors }));
	},

	render() {
		return <Form onSubmit={this.onSubmit}>
			<Input name="username"
				   type="text"
				   validators={[
					   required('Please supply a username.')
				   ]}/>
			<Errors additionalErrors={this.state.errors} />
			<button>Submit</button>
		</Form>;
	}
});
```
