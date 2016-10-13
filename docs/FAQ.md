Common patterns when using formable

- [Accessing refs](#refs)
- [Pending state](#pending)


<div id="refs" />
## Accessing refs

`react-formable` uses refs to keep track of input values. In order to tap into refs within your views, use the [callback style](https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute) and save the `ref` to your components instance.

```
import { From, Input } from 'react-formable';
import { findDOMNode } from 'react-dom';


class View extends React.Component {
    onChange(form) {
        if(form.fieldValues.age === 'clear') {
            findDOMNode(this.input).value = '';
        }
    }

    render() {
        return <Form onChange={this.onChange.bind(this)}>
            <Input ref={input => this.input = input} name="age" />
        </Form>;
    }
}
```


<div id="pending" />
## Pending state
You may want to display loading indicators in your view while your async validators are pending. There are two methods you can use depending on your use case.

```
import { From, Input } from 'react-formable';
function validate(value, fieldValues) {
    return new Promise(resolve => {
        setTimeout(() => {
            return value === 'bad' ? resolve('Opps, bad is not good!') : resolve();
        }, 1000);
    });
}

class View extends React.Component {
    state = { pending: false };

    onSubmit(form) {
        this.setState({ pending: true });
        form.validation.then(res => {
            this.setState({ pending: false });
            // ...
        });
    }

    render() {
        return <Form onSubmit={this.onSubmit.bind(this)}>
            <Input name="age" validators={[validate]} />
            {this.state.pending && <span>pending</span>}
        </Form>;
    }
}
```
