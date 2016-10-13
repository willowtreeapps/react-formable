import * as React from 'react';
import { Form, Input, Errors, IForm } from './root';

type TForm = IForm<{ name: string }>;

interface IState {
    form: TForm;
}

export default class ComponentExample extends React.Component<{}, IState>  {
    public state: IState = {
        form: null
    };

    public render(): React.ReactElement<{}> {
        return <Form onChange={form => this.setState({ form })}>
            <div className="half">
                <Input name="name"
                       autoComplete="off"
                       validators={[
                           value => new Promise(resolve => {
                               setTimeout(() => {
                                   if (!value.length) {
                                       return resolve('bad');
                                   }

                                   resolve();
                               }, 1000);
                           })
                       ]}/>

                <Errors />
            </div>

            <pre className="half">
                {JSON.stringify(this.state.form, null, '  ')}
            </pre>
        </Form>;
    }
}
