import * as React from 'react'
import { render } from 'react-dom'
import { Form, Errors } from '../../src/index'

// Simulate a network request to check if the username is taken
const isUsernameTaken = value =>
  new Promise(resolve => setTimeout(resolve, 100, value === 'taken'))

const Example = props => (
  <Form onSubmit={console.log}>
    <input name="name" placeholder="name" />
    <input name="age" type="number" placeholder="age" />

    <select name="relationship">
      <option value="">Relationship Status</option>
      <option value="single">Single</option>
      <option value="married">Married</option>
      <option value="other">Other</option>
    </select>

    <div>
      Employed: <input type="checkbox" name="employed" />
    </div>

    <button type="submit">SUBMIT</button>

    <Errors />
  </Form>
)

render(<Example />, document.getElementById('example'))
