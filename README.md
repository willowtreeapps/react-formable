# react-formable

The goal of `react-formable` is to provide a simple API to serialize and validate forms. Out of the box, it is compatible with vanilla HTML inputs along with a wide variety of custom inputs.

We do this by passing a `name` to each input element within our `Form`. The form then tracks all these named inputs, whenever one of them changes or the form is submitted, it optionally serializes and validates them and sends them to the `onChange` and `onSubmit` callbacks.

For validation, the `Form` component looks for any `validators` array which is a prop or static member of a component. This array can have functions which accept the input's current value and the entire form's current value, and returns any value. If the result is truthy, it is considered an error. If a promise is returned, any resolved or rejected truthy value is considered an error.

That covers the basics of using `react-formable`. There are plenty of props to customize the default behavior of the form including:

* **Validating the form**: We provide three options for validating the form. By default we validate the form fully when the form is submitted. You can also optionally validate the entire form form, or just the dirty fields, when an input changes.
* **Rendering error messages**: There are two primary ways you can communicate errors to the user. We provide an `<Errors />` that when placed inside the form, it will automatically display any errors within the form. If you want to display errors on the field level, we provide a `mapFieldErrorsToProps` function which takes the field errors of the individual component, the props of that component, and the resulting object is merged into the props of the component. The default for this function appends an `error` class to every input with an associated error.
* **Debouncing validation**: A common use case is to show errors on an individual component level after the user has stopped typing in that field. Between validating only the dirty fields, mapping field errors to props, and debouncing validation, we get this out of the box for free.
* **Inline hits**: Sometimes you may want to display hints to the user as they are typing in a field. Validators can return anything, including an object with extra information. Furthermore, validators get a third parameter which is the source of the event, either `onChange`, `onSubmit`, or `onSerialize`. We can attach this tag to the return value of the validators and use this additional information to render hints or errors.

## API

```ts
interface Props {
  className?: string
  propName?: string // default "name": The prop which signifies to formable that this component should be tracked
  showErrorsOnChange?: boolean | 'field' | 'form' // default false: If the form should show errors onChange. `true` maps to "form" which validates the whole form. "field" only validates dirty fields.
  showErrorsOnSubmit?: boolean // default true:  Shows errors when the form is submited
  onChange?: (fieldValues: FieldValues, validation?: validation) => void
  onSubmit?: (fieldValues: FieldValues, validation: validation) => void
  fieldErrorsToProps?: (errors: any[], props: any) => any
  debounceValidation?: number // default 0: in miliseconds
  configureForm?: ConfigureForm
  removeValidators?: boolean // default true: removes `validators` from the props of tracked components
  removePropName?: boolean // default false: removes `propName` from the props of tracked components
}

interface FieldErrors {
  [name: string]: any
}

interface FieldValues {
  [name: string]: any
}

interface Validation {
  valid: boolean
  fieldErrors: {
    [key: string]: any
  }
  errors: any[]
}

interface ConfigureForm {}
```

## Basic Usage

Lets start things off with a simple example, a login form.

```tsx
import * as React from 'react'
import { render } from 'react-dom'
import Form from 'react-formable'

// Our hypothetical login action
const onSubmit = ({ username, password }) => login(username, password)

const LoginForm = props => (
  <Form onSubmit={onSubmit}>
    <input name="username" type="text" placeholder="username" />
    <input name="password" type="password" placeholder="password" />
    <button type="submit">Login</button>
  </Form>
)

render(<Example />, document.getElementById('example'))
```

Nothing terribly exciting, let's break it down and see what is going on. First, we have the `Form` component exposed by `react-formable`. This wraps all of our inputs and other markup. It exposes two callbacks which we can tap into to grab the state of the form, `onSubmit` and `onChange`.

Moving along, we have a few vanilla DOM nodes, two `input`s and a `button`. The `Form` component tracks all components with a `name` property. The `name` value is then used as the serialized key for the field value. Clicking on the `button` submits the form just as it would a normal `form` tag.

Let's add a few some validation!

```tsx
import * as React from 'react'
import { render } from 'react-dom'
import Form from 'react-formable'
import Errors from 'react-formable/Errors'

// Our hypothetical login action
const onSubmit = ({ username, password }, validation) => {
  if (validation.valid) {
    login(username, password)
  }
}

// Simulate a network request to check if the username is taken
const isUsernameTaken = value =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(value === 'taken')
    }, 1000)
  )

const LoginForm = props => (
  <Form onSubmit={onSubmit}>
    <input
      name="username"
      type="text"
      placeholder="username"
      validators={[
        value => !value.length && 'Username is required',
        value =>
          isUsernameTaken(value).then(
            isTaken => isTaken && 'Username is already taken.'
          ),
      ]}
    />

    <input
      name="password"
      type="password"
      placeholder="password"
      validators={[
        value => !value.length && 'Password required.',
        value =>
          value.length < 8 && 'Password must be longer than 8 characters.',
      ]}
    />

    <button type="submit">Login</button>

    <Errors />
  </Form>
)

render(<Example />, document.getElementById('example'))
```

We added a few things to our login form! `Form` scans all named components for a prop called `validators` which is an array of functions. These functions are called with the value of the of the input along with all values of the form. If you return a truthy value, it is considered an error. If you return a promise, any truthy value either resolved or rejected from the promise is considered an error. Lastly, `Form` strips `validators` from the component by default letting you have validation with any input.

Back to our example, the username field has two validators. One which just checks if the username has length. The second simulates a network request to see if the username provided is `"taken"`, if so, it returns and error message.

We also provide an `Errors` component which renders any errors in the form. We can optionally choose when to show errors, either `onChange` or `onSubmit` (by default).

## Dev

```
yarn start
```
