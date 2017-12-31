import * as React from 'react'
import { render } from 'react-dom'
import { Form, Errors } from '../../src/index'

const Input: React.SFC<any> = ({ validators, ...props }) => <input {...props} />

render(
  <Form showErrorsOnChange="field">
    <Input
      name="username"
      placeholder="name"
      autoComplete="off"
      validators={[
        value =>
          (value.length < 2 || value.length > 4) && '1 Username required.',
      ]}
    />

    <Input
      name="username"
      placeholder="name"
      autoComplete="off"
      validators={[
        value =>
          (value.length < 2 || value.length > 4) && '2 Username required.',
      ]}
    />

    <Input
      name="username"
      placeholder="name"
      autoComplete="off"
      validators={[
        value =>
          (value.length < 2 || value.length > 4) && '3 Username required.',
      ]}
    />

    <Errors />
  </Form>,
  document.getElementById('example')
)
