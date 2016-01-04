react-formable only ships with one lightweight `Input` component. Chances are you will want to create your own inputs and it really can't be any simpler. To integrate a custom input with the `Form`, you need to do the following things:

- Have a `getValue` method which returns the value of the field
- Trigger the `onChange` event when the field changes
- Trigger the `onSubmit` event when the field wants to submit the form (optional)
- Not be a stateless component

To illustrate this we will create our own custom field that displays a label as well as errors inline next to the input. To start off, let's examine what props the `Form` component provides to fields:

- `fieldErrors`: An array of strings representing errors
- `onChange` and `onSubmit` callbacks

Simple right? Now to build the field! We will be building a field from scratch, however if you wanted to just wrap the existing `Input` component, that would work too.

```js
import React from 'react';

const ErrorField = React.createClass({
	getValue() {
		return this.refs.input.value;
	},

    render() {
		let errors;
        let {fieldErrors = [], className = ''} = this.props;

		if (fieldErrors.length) {
			className += 'error';

			errors = <ul className="errors">
				{fieldErrors.map((error) => <li key={error}>{error}</li>)}
			</ul>;
		}

		return <label className={className}>
			<input {...this.props} ref="input" />
			{errors}
		</label>;
    }
});
```

There is a bit going on here, so let's break it down.

The most important piece is our
