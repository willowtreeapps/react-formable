# Brainstorming on how to improve forms...

- [ ] [Live updating](#live-updating)
- [ ] [Nested forms](#nested-forms)
- [ ] [Need more inputs](#more-inputs)
- [ ] [Need to know too much domain knowledge](#domain-knowledge)
- [ ] [Event bubbling is a pain](#event-bubbling)
- [ ] [Better docs](#docs)
- [ ] [Tabular forms](#tabular-forms)
- [ ] [Dynamic inputs](#dynamic-forms)
- [ ] [(?) Form level validation](#form-level-validation)
- [ ] [(?) Change form return value](#form-values)

---

<a name="live-updating"></a>
### Live updating
We need to facilitate automatic displaying of errors on form inputs. Manually binding errors each time can be a pain. (Possibly make a highorder input to auto-serialize?)

One main goal is to have a minimal and clean API to interact with these forms. Right now we just have `onSubmit` and `onChange` as props to the main `Form` component. If we can keep it that simple, we should. Currently, inputs are dumb. All you need to do to have an input work is for it to have a `serialize` method. You can pass in `validators` as props to an input and the form will do all the work. If we want to use higher-order inputs to do auto errors, we would need to have inputs handle their own validation.

We _could_ have an additional prop (or exposed method accessed via ref) which would force errors to be shown. Without looking into it, we would need to store the state of the form internally within the form component then massage the props as we pass them down via `cloneWithProps`. Not sure how much I like that solution...

    onSubmit() {
        // This will run serialize and pass the errors down as props via some vodoo
        this.refs.form.showErrors();
    }

or

    render() {
        return <Form ref="form" autoValidate />;
    }

Talking through this more, if we have a `showErrors` and the state is stored internally within the Form, we need a `clearErrors` function or some similar mechanism to wipe that internal state. Looking goofy already.

<a name="nested-forms"></a>
### Nested Forms
- Normal forms don't let you do it
- Not intuitive, you have to set a `static` property to let the form know how to deal with it
- Edge-cases when dealing with multiple forms with the same refs

<a name="more-inputs"></a>
### We need more inputs
- [x] input
- [x] textarea
- [ ] select
- [ ] datepicker
- [ ] fileuploader

<a name="domain-knowledge"></a>
### Need to know too much domain knowledge
Between nested forms, unspoken contract between form and input, and how serializing information works, there is far too much information hidden away.

<a name="event-bubbling"></a>
### Event bubbling is a pain
Right now you need to know a bit too much information to get inputs to work nicely. It is unclear if you need to pass down `onChange` and `onSubmit` to inputs.

<a name="docs"></a>
### Better docs
We need to document this stuff.

<a name="tabular-forms"></a>
### Tabular form
It is pretty common to need to have forms based around arrays of data. For example you have an array of people `{name, age, eyeColor}` and you want one row in your form for each person. Right now it is possible but pretty dirty.

<a name="dynamic-forms"></a>
### Dynamic forms
Along the lines as tabular forms, we need better documentation and possibly a better mechanism to facilitate dynamic inputs.

<a name="#form-level-validation"></a>
### Form level validation
With very complex forms, validation happens on several levels: input, form, and server. We can handle input quite easily. We may want to consider making it easier to move validation happening from `onSubmit` (or something similar) to form level validation similar to inputs.

<a name="form-values"></a>
### Change form return value
Right now, calling `serialize` returns the following:

    {
        fieldValues: { nameOfField: value },
        fieldErrors: { nameOfField: [errors] },
        errors: [flattenedDownErrors],
        valid: boolean
    }

`fieldValues` and `fieldErrors` are both objects that mimic the refs of the form. `errors` is a convenience property that has the flattened down errors from `fieldErrors`. `valid` is another convenience property that is just `!errors.length`.

If we are taking the time to re-visit how we serialize things, maybe we want to change the return value. Perhaps we could us proxies or something else to eliminate the need for `fieldErrors`.

    var x = {
        values: { name: value },
        errors: [],
        valid: boolean
    };
    // x.values.name > value
    // x.values.name.errors > []

One negative to this approach is that you most likely wouldn't be able to simply use `values` as POJS.

