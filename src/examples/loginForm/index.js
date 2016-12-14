import React from 'react';
import Form from '../../Form';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

// Needed for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()

// An example on how to make a custom input component
// Here we are not passing along validation so not to throw errors
const Input = ({ validators, style={}, ...props }) =>
    <TextField {...props}
               style={{
                   ...style,
                   display: 'block',
                   width: '100%'
               }} />


// An example on how ot make a custom form. Perhaps our application
// Uses material-ui and we want to configure all forms in our
// app to pass down fieldErrors as `errorText` to our inputs.
const MaterialUIForm = ({ ...props }) =>
    <MuiThemeProvider>
        <Form {...props}
              fieldErrorsToProps={fieldErrors => ({
                  errorText: fieldErrors.join(' ')
              })} />
    </MuiThemeProvider>


// Simulate a network request to check if the username is taken
const isUsernameTaken = (value) =>
    new Promise(resolve => setTimeout(resolve, 100, value === 'taken'))


export default props =>
    <MaterialUIForm {...props} debounceValidation={500} showErrorsOnChange>
        <Input name="username"
               placeholder="name"
               validators={[
                   value => isUsernameTaken(value)
                                .then(taken => taken && 'Username is already taken.'),
                   value => !value.length && 'Username required.',
               ]} />

        <Input name="password"
               type="password"
               placeholder="password"
               validators={[
                   value => !value.length && 'Password required.',
                   value => value.length < 8 && 'Password must be longer than 8 characters.',
               ]} />

        <div style={{ marginTop: 25, display: 'flex' }}>
            <RaisedButton label="Clear" type="reset" style={{ margin: '0 25px 0 auto' }} />
            <RaisedButton primary label="Login" type="submit" />
        </div>
    </MaterialUIForm>
