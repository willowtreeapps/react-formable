import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import { Form } from './Form'

const getValueFromEvent = (e: any) => e

describe('Form', () => {
  it('list of 1', () => {
    const spy = jest.fn()

    const form = shallow(
      <Form onChange={spy}>
        <div name="entries" key="1">
          <input name="add" className="input" />
          <input name="remove" />
        </div>
      </Form>
    )

    form.find('.input').simulate('change', { target: { value: 'one' } })

    expect(spy.mock.calls[0][0]).toEqual({
      entries: {
        add: 'one',
        remove: undefined,
      },
    })
  })

  it('list of two', () => {
    const spy = jest.fn()

    const form = shallow(
      <Form onChange={spy}>
        <div name="entries" key="1">
          <input name="add" className="input" />
          <input name="remove" />
        </div>

        <div name="entries" key="2">
          <input name="add" />
          <input name="remove" />
        </div>
      </Form>
    )

    form.find('.input').simulate('change', { target: { value: 'one' } })

    expect(spy.mock.calls[0][0]).toEqual({
      entries: [
        {
          add: 'one',
          remove: undefined,
        },
        {
          add: undefined,
          remove: undefined,
        },
      ],
    })
  })

  it('list of three', () => {
    const spy = jest.fn()

    const form = shallow(
      <Form onChange={spy}>
        <div name="entries" key="1">
          <input name="add" />
          <input name="remove" />
        </div>

        <div name="entries" key="2">
          <input name="add" />
          <input name="remove" />
        </div>

        <div name="entries" key="3">
          <input name="add" className="input" />
          <input name="remove" />
        </div>
      </Form>
    )

    form.find('.input').simulate('change', { target: { value: 'one' } })

    expect(spy.mock.calls[0][0]).toEqual({
      entries: [
        {
          add: undefined,
          remove: undefined,
        },
        {
          add: undefined,
          remove: undefined,
        },
        {
          add: 'one',
          remove: undefined,
        },
      ],
    })
  })

  it('complicated list', () => {
    const spy = jest.fn()

    const form = shallow(
      <Form onChange={spy}>
        <div name="entries" key="1">
          <input name="add" />
          <input name="remove" />
        </div>

        <div name="entries" key="2">
          <input name="add" />
          <input name="remove" />
        </div>

        <div name="entries" key="3">
          <input name="add" className="input" />
          <input name="remove" />
        </div>

        <div name="entries" key="4">
          <div name="entries" key="a">
            <input name="add" />
            <input name="remove" />
          </div>
          <div name="entries" key="b">
            <input name="add" />
            <input name="remove" />
          </div>
          <div name="entries" key="c">
            <input name="add" />
            <input name="remove" />
          </div>
        </div>
      </Form>
    )

    form.find('.input').simulate('change', { target: { value: 'one' } })

    expect(spy.mock.calls[0][0]).toEqual({
      entries: [
        {
          add: undefined,
          remove: undefined,
        },
        {
          add: undefined,
          remove: undefined,
        },
        {
          add: 'one',
          remove: undefined,
        },
        {
          entries: [
            {
              add: undefined,
              remove: undefined,
            },
            {
              add: undefined,
              remove: undefined,
            },
            {
              add: undefined,
              remove: undefined,
            },
          ],
        },
      ],
    })
  })
})
