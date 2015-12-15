import React from 'react';
import Form, { Input } from 'react-formable';

export default React.createClass({
    render() {
        return <Form>
			<h1>Look Ma, Forms!</h1>
            <Input name="name" type="text" />
            <Input name="ne" type="text" />
            <Input name="nes" type="text" />
        </Form>;
    }
});
