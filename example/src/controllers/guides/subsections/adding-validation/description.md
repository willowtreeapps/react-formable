In a perfect world, our beautiful `PersonForm` will always have proper information. Users will know exactly which fields are required and which ones are not. _Just in case_, we should probably do some validation to make sure things are all good.

With react-formable, you can validate any type of input, `Fieldset`, `Fieldlist`, and the `Form` itself. Each of these components takes in an array of validator functions. These validator functions are pure functions that take in params and return a string if errors are found. This string will then be inserted into our `fieldErrors` object and subsequently our `errors` array.

Each validator takes the following three parameters:

- `value`: The current value of the object. For inputs, it will be the value of the inputs. For `Form`s, `Fieldset`s, and `Fieldlist`s it will be an object or array of all the fields underneath it.
- `fieldValues`: All the `fieldValues` for the form.
- `fieldErrors?`: All the `fieldErrors` for the form. This will only be present if `addValidationErrors` is set to `true` on the parent `Form`.

**NB:** `fieldValues` and `fieldErrors` in our validators params are the same values we receive in `onSubmit` and `onSuccess`.

Now we can use this to make a `required` validator for `PersonForm`.

```js
function required(value, fieldValues, fieldErrors) {
	if (!value || !value.length) {
		return 'Missing required field!';
	}
};
```

Now, let's use it! _(To keep things manageable, we will go back to a simpler person form)_.

```js
function PersonForm(props) {
	return <Form onSubmit={onSubmit}>
		<label>
			Name:
			<Input name="name"
				   type="text"
				   validators={[
					   required
				   ]}/>
		</label>
		<label>
			Age:
			<Input name="age"
				   type="text"
				   validators={[
					   required
				   ]}/>
		</label>
	</Form>;
}
```

Notice here we are passing in our newly created `required` function to the array supplied to the `validators` prop. In this manner, you can chain as many validators as you want together. What does this result in?

```json
{
	"valid": false,
	"fieldValues": {
		"name": "",
		"age": ""
	},
	"fieldErrors": {
		"name": ["Missing required field!"],
		"age": ["Missing required field!"]
	},
	"errors": ["Missing required field!"]
}
```

We see here that in `fieldErrors` both `name` and `age` have the the error message. `errors` only has one copy of the two messages. This is due to `errors` always compacting the strings to unique values.

Moving forward, how can we write our `required` validator to display custom error messages? We can do this by making it a higher order (or curried) function.

```js
function required(errorMessage) {
	return function (value, fieldValues, fieldErrors)
		if (!value || !value.length) {
			return 'Missing required field!';
		}
	};
};
```

Now we have a function that takes in an error message and returns a validator which will display the error message if our field is not present. In use, our form looks very similar.

```js
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
	</Form>;
}
```

Validating `Fieldset`s, `Fieldlist`s, and `Form`s are all similar. The only difference is the `value` property supplied to the validator is the value of all its subfields. With `Fieldlist`, it is an array of objects, `Fieldset` and `Form` receive an object.
