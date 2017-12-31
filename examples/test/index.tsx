import * as React from 'react'
import { render } from 'react-dom'
import { Form, Errors, Input } from '../../src/index'

render(
  <Form showErrorsOnChange="field" onSubmit={console.log}>
    <Input
      name="username"
      placeholder="name"
      autoComplete="off"
      validators={[
        value =>
          (!value || (value.length < 2 || value.length > 4)) &&
          '1 Username required and must bet between 2 an 4 characters',
      ]}
    />

    <Input
      name="username"
      placeholder="name"
      autoComplete="off"
      validators={[
        value =>
          (!value || (value.length < 2 || value.length > 4)) &&
          '2 Username required and must bet between 2 an 4 characters',
      ]}
    />

    <Input
      name="username"
      placeholder="name"
      autoComplete="off"
      validators={[
        value =>
          (!value || (value.length < 2 || value.length > 4)) &&
          '3 Username required and must bet between 2 an 4 characters',
      ]}
    />

    <Errors />

    <button>done</button>
  </Form>,
  document.getElementById('example')
)
