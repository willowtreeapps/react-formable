import React from 'react';
import ReactDOM from 'react-dom';

import Form from './form';
import Input from './inputs/input';
import Test from './inputs/test';

export class App extends React.Component {
	render() {
        return <Form>
			<Input type="text" name="test" format={x => x.toUpperCase()}/>
			<Test type="text" name="test" format={x => x.toUpperCase()}/>
        </Form>;
	}
}

ReactDOM.render(<App/>, document.querySelector("#app-container"));
