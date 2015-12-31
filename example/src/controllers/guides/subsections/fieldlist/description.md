What? _Another_ requirement change? As it turns out, people typically have more than one pet. How can we have lists of pets within our form? Simply, we can use the `Fieldlist` component to group together lists of values.

```js
import Form, { Input, Fieldlist } from 'react-formable';

function onSubmit(form) {
	console.log(form);
}

function PersonForm(props) {
	return <Form onSubmit={onSubmit}>
		<label> Name: <Input name="name" type="text" /> </label>
		<label> Age: <Input name="age" type="text" /> </label>
		<Fieldlist name="pets">
			<div>
				<label> Pet Name: <Input name="name" type="text" /> </label>
				<label> Pet Type: <Input name="type" type="text" /> </label>
			</div>
			{/* more pets here... */}
		</Fieldlist>
		<button>Submit</button>
	</Form>;
}
```

Similar to `Fieldset`, `Fieldlist` accepts a `name` property which it nests all its children under. Internally, `Fieldlist` works by taking each direct child it owns and wrapping it in a `Fieldset`. This is why we don't need to use `Fieldset` within `Fieldlists`. If we did, we would have an extra object with the name of the `Fieldset` within our form data.

As we would expect, our `Fieldlist` has a value of an array of objects which we see in its returned value.

```json
{
	"valid": true,
	"fieldValues": {
		"name": "",
		"age": "",
		"pets": [
			{
				"name": "",
				"type": ""
			}
		]
	},
	"fieldErrors": {
		"name": [],
		"age": [],
		"pets": [
			{
				"name": [],
				"type": []
			}
		]
	},
	"errors": []
}
```

With this in mind, we could easily make a `Fieldlist` with only inputs in it. For example, a form with just names of people.

```js
import Form, { Input, Fieldlist } from 'react-formable';

function PeopleNameForm(props) {
	return <Form>
		<Fieldlist name="people">
			<label> Name: <Input name="name" type="text" /> </label>
			<label> Name: <Input name="name" type="text" /> </label>
			<label> Name: <Input name="name" type="text" /> </label>
		</Fieldlist>
		<button>Submit</button>
	</Form>;
}
```
