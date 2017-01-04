import * as React from 'react'
import { render } from 'react-dom'
import Form from 'react-formable/Form'
import Errors from 'react-formable/Errors'

const Example = props =>
    <Form showErrorsOnChange="field">
        <input name="username"
               placeholder="name"
               autoComplete="off"
               validators={[ value => (value.length < 2 || value.length > 4) && '1 Username required.' ]} />

        <input name="username"
               placeholder="name"
               autoComplete="off"
               validators={[ value => (value.length < 2 || value.length > 4) && '2 Username required.' ]} />

        <input name="username"
               placeholder="name"
               autoComplete="off"
               validators={[ value => (value.length < 2 || value.length > 4) && '3 Username required.' ]} />

        <Errors />
    </Form>

render(<Example />, document.getElementById('example'));
