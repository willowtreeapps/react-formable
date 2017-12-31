import * as React from 'react'
import { shallow } from 'enzyme'
import { Errors } from './Errors'

const getValueFromEvent = (e: any) => e

describe('Errors', () => {
  it('renders formable errors', () => {
    expect(shallow(<Errors _errors={['one']} />).children().length).toBe(1)

    expect(shallow(<Errors _errors={['one', 'two']} />).children().length).toBe(
      2
    )
  })

  it('renders passed in errors', () => {
    expect(shallow(<Errors errors={['one']} />).children().length).toBe(1)

    expect(shallow(<Errors errors={['one', 'two']} />).children().length).toBe(
      2
    )
  })

  it('de-dupes errors', () => {
    expect(shallow(<Errors errors={['one', 'one']} />).children().length).toBe(
      1
    )

    expect(
      shallow(<Errors errors={['one', 'two', 'one', 'two']} />).children()
        .length
    ).toBe(2)

    expect(
      shallow(
        <Errors _errors={['one', 'one']} errors={['one', 'one']} />
      ).children().length
    ).toBe(1)

    expect(
      shallow(
        <Errors
          _errors={['one', 'two', 'one', 'two']}
          errors={['one', 'two', 'one', 'two']}
        />
      ).children().length
    ).toBe(2)

    expect(
      shallow(
        <Errors
          _errors={['one', 'two', 'one', 'two']}
          errors={['one', 'two', 'one', 'two', 'another']}
        />
      ).children().length
    ).toBe(3)
  })
})
