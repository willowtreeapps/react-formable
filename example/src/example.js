import React from 'react';
import ReactDOM from 'react-dom';
import Form, { Input } from 'react-reform';

const App = React.createClass({
    render() {
        return <Form>
            <Input name="name" type="text" />
        </Form>;
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
