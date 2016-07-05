import * as React from 'react';
import { Form, Input, Errors} from './root';

interface IState {
    form: any;
}

export default class ComponentExample extends React.Component<{}, IState>  {
    public state: IState = {
        form: null
    };

    public render(): React.ReactElement<{}> {
        return <Form showErrorsOnChange
                     onChange={form => this.setState({ form })}>
            <div className="half">
                <Input name="name"
                       autoComplete="off"
                       validators={[
                           value => !value.length && 'bad'
                       ]}/>

                <Errors />
            </div>

            <pre className="half">
                {JSON.stringify(this.state.form, null, '  ')}
            </pre>
        </Form>;
    }
}
