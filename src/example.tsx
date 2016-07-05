import * as React from 'react';
import { Form, Input, Errors} from './root';

interface IState {
    name: string;
}

export default class ComponentExample extends React.Component<{}, IState>  {
    public state: IState = {
        name: ''
    };

    public render(): React.ReactElement<{}> {
        return <Form onChange={form => this.setState({ name: form.fieldValues.name })}
                     onSubmit={form => console.log(form)}
                     showErrorsOnChange>
            <Input name="name"
                   value={this.state.name}
                   validators={[
                       value => !value.length && 'bad'
                   ]}/>

            <span>{this.state.name}</span>

            <Errors />
        </Form>;
    }
}
