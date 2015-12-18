# react-formable

## Instructions

### Build

`npm run build`

### Dev

`npm start`

## Examples

### Basic usage
```js
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
```
The form above would output the following JSON:

```JSON
{
    "valid": true,
    "fieldValues": {
        "username": ""
    },
    "fieldErrors": {
        "username": []
    },
    "errors": []
}
```

### Nested data

What if we are modeling a `person` in our form? Maybe we want to have a `person` with a single `pet` object. (Start with the best intentions, right?) We can achieve this with `Fieldset`.

```js
<Form>
	<Input name="name" type="text" />
	<Input name="age" type="text" />
    <Fieldset name="pet">
    	<Input name="name" type="text" />
    </Fieldset>
</Form>;
```

The form above would output the following JSON:

```JSON
{
    "valid": true,
    "fieldValues": {
        "name": "",
        "pet": {
            "name": ""
        }
    },
    "fieldErrors": {
        "name": [],
        "pet": {
            "name": []
        }
    },
    "errors": []
}
```

Notice here how the information is nested. The `name` on our `Fieldset` component translated into the serialized `form` object. Similarly, our errors nest in an identical structure.

### Repetitive data

Realistically, you can't just have one pet. How do we get arrays of pets belonging to our person? Using `Fieldlist`:

```js
<Form>
	<Input name="name" type="text" />
	<Input name="age" type="text" />
    <Fieldlist name="pets">
    	<Input name="name" type="text" />
    	<Input name="name" type="text" />
    </Fieldlist>
</Form>;
```

The form above would output the following JSON:


```JSON
{
  "valid": true,
  "fieldValues": {
    "name": "",
    "age": "",
    "pets": [
      { "name": "" },
      { "name": "" }
    ]
  },
  "fieldErrors": {
    "name": [],
    "age": [],
    "pets": [
      { "name": [] },
      { "name": [] }
    ]
  },
  "errors": []
}
```

Without `Fieldlist`, we would have received an error saying we had conflicting names. `Fieldlist` takes care of this for us by wrapping each one of its `children` in a `Fieldset` component. What if we want our list of pets to be more complex?

```js
<Form>
    <Input name="name" type="text" />
    <Input name="age" type="text" />
    <Fieldlist name="pets">
        <div>
            <Input name="name" type="text" />
            <Input name="type" type="text" />
        </div>
        <div>
            <Input name="name" type="text" />
            <Input name="type" type="text" />
        </div>
    </Fieldlist>

</Form>
```

```JSON
{
  "valid": true,
  "fieldValues": {
    "name": "",
    "age": "",
    "pets": [
      {
        "name": "",
        "type": ""
      },
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
      },
      {
        "name": [],
        "type": []
      }
    ]
  },
  "errors": []
}
```

Again, any direct child of `Fieldlist` becomes wrapped in a `Fieldset`. This makes it very easy to just render `div`s within a `Fieldlist` and not worry about additional components.

### Putting it all together

Let's get all inception up in here. We want a list of `people` all who own `pets`. Each `pet` has some `metadata`. Sound hard? Nope.

```js
<Form>
    <Fieldlist name="people">
        <Input name="name" type="text" />
        <Input name="age" type="text" />
        <Fieldlist name="pets">
            <div>
                <Input name="name" type="text" />
                <Input name="type" type="text" />
                <Fieldset name="metadata">
                    <Input name="favoriteTreat" type="text" />
                </Fieldset>
            </div>
        </Fieldlist>
    </Fieldlist>
</Form>
```

```JSON
{
  "valid": true,
  "fieldValues": {
    "people": [
      {
        "name": ""
      },
      {
        "age": ""
      },
      {
        "pets": [
          {
            "name": "",
            "type": "",
            "metadata": {
              "favoriteTreat": ""
            }
          }
        ]
      }
    ]
  },
  "fieldErrors": {
    "people": [
      {
        "name": []
      },
      {
        "age": []
      },
      {
        "pets": [
          {
            "name": [],
            "type": [],
            "metadata": {
              "favoriteTreat": []
            }
          }
        ]
      }
    ]
  },
  "errors": []
}
```

### Showing errors

Ok, this is all well and good. Holy cow tho, those forms can get nested! How are we expected to get and display these error messages?

Forms have you covered. Your first resource (if you ever need it), is `fieldErrors`. This object mirrors your `fieldValues` object; however, instead of values, you have arrays of strings representing errors. With that said, it would be a huge pain to have to go through that entire tree to get a simple list of errors in your forms. To aid with that, there is a flattened down unique list of errors cleverly named... `errors`.

How could we go displaying these errors? With `onChange` we would save our form's serialized values to some internal state. With each render we would manually pass down the error messages to their corresponding inputs. Sound tedious? It really is; that's why we made some helper functions to do this for you: `showFieldErrors` and `clearFieldErrors`. This will automatically save your form to state and pass down the appropriate errors to the appropriate fields.

Lastly, how do we actually render those errors to the screen? The handy `Errors` component. Think of `Errors` like a placeholder for where you want it to render your errors. You can place it anywhere in the `Form` markup and it will render out your errors there.  

```js
class App extends React.Component {
	render() {
        return <Form>
			<Input name="username"
                   validators={[
                       function(value) { if(!value) return 'Required field! D:'; }
                   ]} />

            <Errors />
        </Form>
	}
}
```

```JSON
{
  "valid": false,
  "fieldValues": {
    "username": ""
  },
  "fieldErrors": {
    "username": [
      "Required field"
    ]
  },
  "errors": [
    "Required field"
  ]
}
```

Several things are happening here. First, we attach a `ref` to our form component. This lets us have access to the form instance. Next, we bind our `onSubmit` handler to our `onSubmit` function. Now when the form submits itself, our callback executes. Within our callback, we access our form's `ref` and call `showFieldErrors`; this will automatically propagate our errors to our inputs. Lastly, we save the return value of calling `showFieldErrors`, which is a flattened down version of all errors that are currently being shown. We can do anything we want with this; for a common example, we can save it to state to render as a list at the bottom of our form.

## Docs

### `Form`

The top level `Form` component is what serializes your data.

| Property | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| onChange| function(form) | undefined | A callback which will be called whenever any child input changes. Receives the serialized form object |
| onSubmit | function(form) | undefined | A callback which will be called whenever the form is submitted. Receives the serialized form object |
| showErrorsOnSubmit | boolean | true | A boolean to decide if errors should be shown on submit |
| showErrorsOnChange | boolean(form) | false | A boolean to decide if errors should be shown on change |

There are a handful of methods on the `Form` component which are useful. To access these, attach a `ref` to the `Form` and call them via `this.refs.refName.methodName();`.

| Method | Params | Description |
| :----- | :----- | :---------- |
| serialize | | Returns the serialized form object |
| showFieldErrors | | Passes down errors to inputs within the form |
| clearFieldErrors | | Clears errors passed down to inputs within the form |


### `Fieldset`

`Fieldset`s are where most of the magic happens. They let us group together similar fields into smaller bite-sized objects. We can use these within individual forms, or make reusable form components and use them all over the place.

One important thing to understand: `Fieldset`s will always make an object with the `name` provided. If you use a `Fieldset` within a `Fieldlist`, you will have a nested object with the name of the `Fieldset`.

One last thing to keep in mind: you can attach validators to `Fieldset`s. Instead of a primitive passed down as the first param, it will be the subtree that the `Fieldset` represents. Any errors returned from a `Fieldset`s validators will skip `fieldErrors` and go directly to `errors`.

| Property | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| validators |array[function(value, fieldValues, fieldErrors, subtreeErrors)] | [] | An array of validators to run over the input |
| name | string | undefined | The name of the field which will get serialized. This will get copied over as `ref`. This means `name` _must be unique_, otherwise you will run into collisions. |

### `Fieldlist`

`Fieldlist` uses `Fieldset` under the hood to render each *direct* child it owns. This means if you nest `Fieldset`s within a `Fieldlist`, you will get some extra objects floating around. Similarly to `Fieldset`, validators return the subtree that the `Fieldlist` represents.

| Property | Type | Default| Description |
| :------- | :--- | :----- | :---------- |
| validators | array[function(value, fieldValues, fieldErrors, subtreeErrors)] | [] | An array of validators to run over the input |
| name | string | undefined | The name of the field which will get serialized. This will get copied over as `ref`. This means `name` _must be unique_, otherwise you will run into collisions. |

### `Input`

To integrate inputs with `Form`s, you need to ensure two things.

1. The input has a `getValue` method. This method returns the current value of the input.
2. The input has to be able to work with your `refs`. This unfortunately means no stateless components.

| Property | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| value | string | undefined | The value of the field |
| validators |array[function(value, fieldValues, fieldErrors, subtreeErrors)] | [] | An array of validators to run over the input |
| name | string | undefined | The name of the field which will get serialized. This will get copied over as `ref`. This means `name` _must be unique_, otherwise you will run into collisions. |
| fieldErrors | array[string] | [] | An array of string errors to pass down to the input. This is automatically filled via the form. You can overwrite this field if you want to manually show an error on an input |
| validateOnBlur | boolean | false | A boolean which forces the field to wait until it fires a blur event to trigger form validation |

### `Errors`

A component which soaks up and displays form errors (when placed within a form).

| Property | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| scoped | boolean | false | **EXPERIMENTAL:** Only displays form errors in relation to the elements nearest parent |
| additionalErrors | array[string] | [] | Any additional errors you would want to render to the screen can be passed down as an array of strings. |
| renderError | function(error) => node | identity | If you want to overwrite how errors are rendered, you can do so by providing a callback to errors. This function will receive each error and will return what you want to be rendered as your error. |


## TODO

- More advanced reusable components
- High order forms to keep common tasks simple
- Overview of writing your own inputs
