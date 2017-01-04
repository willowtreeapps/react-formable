import * as React from 'react'
import { render } from 'react-dom'
import Errors from 'react-formable/Errors'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import Form from './form'

const Example = props =>
    <Form debounceValidation={300} showErrorsOnChange="field" onSubmit={console.log}>
        <TextField name="username"
                   placeholder="username"
                   style={{ display: 'block', marginBottom: '20px' }}
                   validators={[ value => !value.length && 'Username required.' ]} />

        <TextField name="password"
                   type="password"
                   placeholder="password"
                   style={{ display: 'block', marginBottom: '20px' }}
                   validators={[ value => !value.length && 'Password required.' ]} />

        <Checkbox name="rememberMe" label="Remember Me" style={{ marginBottom: '10px' }} />

        <RadioButtonGroup name="active" style={{ marginBottom: '10px' }}>
            <RadioButton value="yes" label="yes" />
            <RadioButton value="sometimes" label="sometimes" />
            <RadioButton value="no" label="no" />
        </RadioButtonGroup>

        <button type="submit">SUBMIT</button>
        <button type="reset">RESET</button>

        <Errors />
    </Form>

render(<MuiThemeProvider>
    <Example />
</MuiThemeProvider>, document.getElementById('example'));
