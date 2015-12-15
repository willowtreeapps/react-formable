import React from 'react';
import Form, { Input } from 'react-formable';

function required(error) {
	return function(val) {
		return val.length < 3 ? null : error;
	};
}

export default React.createClass({
	onChange(form) {
		this.refs.form.showFieldErrors();
	},

    render() {
        return <Form ref="form" onChange={this.onChange}>
			<h1>Look Ma, Forms!</h1>
			
            <Input
				name="name"
				type="text"
				validateOnBlur
				validators={[required('name')]} />

            <Input
				name="age"
				type="text"
				validators={[required('name')]} />
        </Form>;
    }
});
