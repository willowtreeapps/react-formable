Suddenly, our requirements change! Now we want to know more information about our person's pet. We want to know its `name` and `type`. Our server expects a `Pet` model to be an object with `name` and `type` as fields, how can we accommodate this?

react-formable comes with a `Fieldset` component which does exactly this. `Fieldset` takes in a `name` property and groups inputs within its scope.

```js
import Form, { Input, Fieldset } from 'react-formable';

function onSubmit(form) {
	console.log(form);
}

function PersonForm(props) {
	return <Form onSubmit={onSubmit}>
		<label> Name: <Input name="name" type="text" /> </label>
		<label> Age: <Input name="age" type="text" /> </label>
		<Fieldset name="pet">
			<label> Pet Name: <Input name="name" type="text" /> </label>
			<label> Pet Type: <Input name="type" type="text" /> </label>
		</Fieldset>
		<button>Submit</button>
	</Form>;
}
```

Not too much has changed. We wrapped our two pet fields within a `Fieldset` named `pet`. One interesting thing to note is we now have two inputs in our form with a name of `name`. Normally, `Form` would warn you that your inputs must have unique names. `Fieldset`s (and `Fieldlist`s) get around this limitation by scoping fields. To better understand this, here is the result of serializing the form.

```json
{
	"valid": true,
	"fieldValues": {
		"name": "",
		"age": "",
		"pet": {
			"name": "",
			"type": ""
		}
	},
	"fieldErrors": {
		"name": [],
		"age": [],
		"pet": {
			"name": [],
			"type": []
		}
	},
	"errors": []
}
```

As we can see, our `fieldValues` and `fieldList` properties have a new `pet` object that has child properties of `name` and `type`. Similarly, our `fieldErrors` property has nested arrays that match up with our `fieldValues`.
