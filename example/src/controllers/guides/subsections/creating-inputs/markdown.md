react-formable only ships with one lightweight `Input` component. Chances are you will want to create your own fields and it really can't be any simpler. To integrate a custom field with the `Form`, you need to do the following things:

- Have a `getValue` method which returns the value of the field
- Trigger the `onChange` event when the field changes
- Trigger the `onSubmit` event when the field wants to submit the form (optional)
- Not be a stateless component

To illustrate this we will create our own custom field that displays errors inline next to the field. To start off, let's examine what props the `Form` component provides to fields:

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
        let { fieldErrors = [], className = '' } = this.props;

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

The most important piece is our `getValue` method. This is the only necessary method your field needs to implement in order to work with react-formable. The implementation here is simple, just reach into `refs` and get the value of the input.

The `render` method also has some interesting interesting things to note. The most obvious is optionally rendering a list of errors and modifying the `className` of the `label`. As we mentioned before, every component receives `fieldErrors` as a prop. We can then use this as a means to render our errors.

The second thing to point out is the use of splatting our props to our input. The most important thing this accomplishes is binding our `onChange` and `onSubmit` callbacks to our input. Recall our 3 requirements? Implement `getValue` and bind `onChange` and `onSubmit`. Our `Form` passes down the callbacks to our component which then forwards those callbacks to the input. HTML inputs automatically triggers these callbacks when the user interacts with them. If we wrote a custom input that did not use native HTML inputs, we would need to trigger these callbacks manually.
