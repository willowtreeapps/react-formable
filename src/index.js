import React from 'react';
import ReactDOM from 'react-dom';
import Form from './examples/complexValidation'
import './index.css';


export default class Example extends React.Component {
    state = { form: {} }
    render() {
      return <div style={{ margin: '100px auto', width: 300 }}>
          <Form onChange={form => this.setState({ form })}/>
          <pre>{JSON.stringify(this.state.form, null, 4)}</pre>
      </div>
    }
}

ReactDOM.render(
    <Example />,
    document.getElementById('root')
);
