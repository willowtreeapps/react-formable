import * as React from 'react';
import { Form, Input, Errors} from './root';

interface IState {
    name: string;
    form: any;
}

export default class ComponentExample extends React.Component<{}, IState>  {
    public state: IState = {
        name: '',
        form: null
    };

    public render(): React.ReactElement<{}> {
        return <Form onChange={form => this.setState({ name: form.fieldValues.name, form })}
                     onSubmit={form => console.log(form)}
                     showErrorsOnChange>
            <div className="half">
                <Input name="name"
                       value={this.state.name}
                       autoComplete="off"
                       validators={[
                           value => !value.length && 'bad'
                       ]}/>

                <span>{this.state.name}</span>

                <Errors />
            </div>

            <pre className="half">
                {JSON.stringify(this.state.form, null, '  ')}
            </pre>
        </Form>;
    }
}
