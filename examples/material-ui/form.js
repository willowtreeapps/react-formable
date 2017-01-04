import * as React from 'react'

import Form from 'react-formable'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

/*
We have to teach formable how to serialize custom inputs. We do this by
providing a `configureForm` function. This function recives the type of
the input along with the inputs props. Returning a configuration object
lets us specify how each field is serialized. If we return undefined
at the end, any unkown inputs are handeled as normal.
*/

const configureForm = (type, props) => {
    if (type === TextField) {
        return {
            eventName: 'onChange',
            getValueFromEvent: (e, val) => val,
            defaultProp: 'defaultValue',
            valueProp: 'value',
            fieldErrorsToProps: errors => ({ errorText: errors.join(' ') })
        }
    }

    if (type === Checkbox) {
        return {
            eventName: 'onCheck',
            getValueFromEvent: (e, val) => val,
            defaultProp: 'defaultChecked',
            valueProp: 'checked'
        }
    }

    if (type === Toggle) {
        return {
            eventName: 'onToggle',
            getValueFromEvent: (e, val) => val,
            defaultProp: 'defaultToggled',
            valueProp: 'toggled'
        }
    }

    if (type === RadioButtonGroup) {
        return {
            eventName: 'onChange',
            getValueFromEvent: (e, val) => val,
            defaultProp: 'defaultSelected',
            valueProp: 'valueSelected'
        }
    }
}

const MaterialUiForm = props =>
    <Form {...props} configureForm={configureForm} />

export default MaterialUiForm
