jest.unmock('../form');
jest.unmock('../normalizeInput');
jest.unmock('../inputs/input');

import * as React from 'react';
const TestUtils = require('react-addons-test-utils');
const Form = require('../form').default;
const Input = require('../inputs/input').default;
const normalizeInput = require('../normalizeInput').default;

const dummyDecorator = (Component: any): any => (props:any ): any => <Component {...props} />;

// We want to have the same scenario tested over multiple avenues
function makeTest(CustomInput: any, itMessage: any): any {
    return it(itMessage, () => {
        const onChange = jest.fn();
        let form = TestUtils.renderIntoDocument(
            <Form onChange={onChange}>
                <CustomInput name="name" validators={[ val => val === 'bad' && 'error']} />
            </Form>
        );
        const inputNode = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

        inputNode.value = 'test';
        TestUtils.Simulate.change(inputNode);

        expect(onChange).toBeCalled();
        expect(onChange.mock.calls[0][0].fieldValues).toEqual({
            name: 'test'
        });

        inputNode.value = 'bad';
        TestUtils.Simulate.change(inputNode);

        return onChange.mock.calls[1][0].validation.then(validation => {
            expect(validation).toEqual({
                valid: false,
                errors: ['error'],
                fieldErrors: {
                    name: ['error']
                }
            });
        });
    });
}

describe('normalizeInput', () => {
    // STATELESS COMPONENTS
    // ===================================================
    const Input1 = normalizeInput(props => <input {...props} />);
    makeTest(Input1, 'normalizes a normal statless component');

    const Input2 = normalizeInput(
        { getValueFromEvent: e => e },
        (props) => <input {...props} onChange={e => props.onChange(e.target.value)} />
    );
    makeTest(Input2, 'normalizes a slightly more involved stateless component');

    // FORMABLE COMPONENTS
    // ===================================================
    makeTest(normalizeInput(Input), 'normalizes the raw formable Input');

    // CLASS / DECORATED COMPONENTS
    // ===================================================
    @normalizeInput
    class Input3 extends React.Component<any, {}>  {
        public render(): React.ReactElement<{}> {
            return <input {...this.props} />;
        }
    }
    makeTest(Input3, 'normalizes a decorated statefull component');

    @normalizeInput({ event: 'custom', getValueFromEvent: e => e })
    class Input4 extends React.Component<any, any>  {
        public render(): React.ReactElement<{}> {
            return <input {...this.props} onChange={e => this.props.custom(e.target.value)} />;
        }
    }
    makeTest(Input4, 'normalizes a more in depth decorated component');

    @normalizeInput
    @dummyDecorator
    class Input5 extends React.Component<any, {}>  {
        public render(): React.ReactElement<{}> {
            return <input {...this.props} />;
        }
    }
    makeTest(Input5, 'normalizes a deeply decorated class');
});
