react-formable gives you a handful of components that allow you to compose abstract forms to your hearts content. To demonstrate this, we will build a "person" form. We want the ability to add people with a name, age, and a pet. To start, we will only need two components, `Form` and `Input`.

This simple example brings to light a few design decisions of react-formable.

- There is no need for rigid markup or schemas. You can structure your markup however you want.
- To make an input visible to the `Form` component, you must supply a `name` property which is unique.

With this in mind, what is actually happening here? We have created a [stateless component](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) which renders a `Form` to the screen. Our component logs out the value of the form whenever it is submitted either via the html buttons default click functionality or pressing enter within an input. All in all, not too exciting. Let's take a peak at the data that gets logged to the console.

```js
import React from 'react';
import Form, { Input } from 'react-formable';

export default function PersonForm({ onChange }) {
    return <Form onChange={onChange}>
        <label> Name: <Input name="name" type="text" /> </label>
        <label> Age: <Input name="age" type="text" /> </label>
        <label> Pet: <Input name="pet" type="text" /> </label>
        <button>Submit</button>
    </Form>;
}
```

### Form return value

Now this is more exciting to look at. At the core of this data structure is `fieldValues` and `fieldErrors`. These two objects mirror the structure of your form. `fieldValues`, as the name implies, is a key value object where the key is the name of your input and the value is its value.  `fieldErrors` is similar, however the values in this object are arrays of string representing errors.

The remaining fields, `valid` and `errors`, are computed properties. `errors` is a flattened down and compacted array of all the errors found in `fieldErrors`. This means if multiple fields have errors of the message `"required"` then the `errors` array will only contain a single string, `"required"`. We can use this array for easily keeping track of errors as our forms grow in complexity. `valid` is a simple boolean which tells us if our form is valid. It does this by checking the length of the `errors` property.

```json
{
	"valid": true,
	"fieldValues": {
		"name": "",
		"age": "",
		"pet": ""
	},
	"fieldErrors": {
		"name": [],
		"age": [],
		"pet": []
	},
	"errors": []
}
```
