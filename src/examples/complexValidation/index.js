import React from 'react';
import Form from '../../Form';
import FlipMove from 'react-flip-move'
import Errors from '../../Errors'
import './index.css'

// Needed for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()

const ErrorAnimator = ({ errors }) =>
    <div className="inline-errors">
        <FlipMove>
            {errors.map(e => <div key={e}>{e}</div>)}
        </FlipMove>
    </div>


// An example on how to make a custom input component
// Here we are not passing along validation so not to throw errors
const Input = ({ validators, errors, ...props }) =>
    <div className="input-row">
        <input {...props} />
        <ErrorAnimator errors={errors} />
    </div>



export default props =>
    <Form {...props}
          showErrorsOnChange
          debounceValidation={1000}
          fieldErrorsToProps={fieldErrors => {
              return { errors: fieldErrors.map(error => error.source === 'onChange' && error.msg).filter(x => x) }
          }}>
        <Input name="username"
               placeholder="name"
               validators={[
                   (value, fieldValues, source) => !value.length && { msg: 'Username required.', source },
               ]} />

        <Input name="password"
               type="password"
               placeholder="password"
               validators={[
                   (value, fieldValues, source) => !value.length && { msg: 'Password required.', source },
                   (value, fieldValues, source) => value.length < 8 && { msg: 'Password must be longer than 8 characters.', source },
               ]} />

        <Errors className="errors"
                renderError={error => error.source === 'onSubmit' && error.msg} />
    </Form>
