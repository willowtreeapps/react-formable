import React from 'react';
import ReactDOM from 'react-dom';

import Form from './form';
import Input from './inputs/input';

export class App extends React.Component {
	render() {
        return <Form>
			<Input type="text" name="test" format={x => x.toUpperCase()}/>
        </Form>;
	}
}

ReactDOM.render(<App/>, document.querySelector("#app-container"));
