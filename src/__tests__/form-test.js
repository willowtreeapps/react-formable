jest.dontMock('../form');
jest.dontMock('../inputs/input');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Form = require('../form').default;
const Input = require('../inputs/input').default;

describe('Form', () => {
    it('submits if the user hits enter', () => {
        const onSubmit = jest.genMockFn();
        let form = TestUtils.renderIntoDocument(
            <Form onSubmit={onSubmit}>
                <label> Pet Name: <Input name="petname" type="text" /> </label>
            </Form>
        );
        const inputNode = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

        inputNode.value = 'george'
        TestUtils.Simulate.change(inputNode);
        TestUtils.Simulate.keyDown(inputNode, { key: 'Enter',
            keyCode: 13, which: 13 });

        expect(onSubmit).toBeCalled();
        expect(onSubmit.mock.calls[0][0].fieldValues).toEqual({
            petname: 'george'
        });
    });

    it('triggers change if the form changes', () => {
        const onChange = jest.genMockFn();
        let form = TestUtils.renderIntoDocument(
            <Form onChange={onChange}>
                <label> Favorite color: <Input name="color" type="text" /> </label>
            </Form>
        );
        const inputNode = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

        inputNode.value = 'red';
        TestUtils.Simulate.change(inputNode);

        expect(onChange).toBeCalled();
        expect(onChange.mock.calls[0][0].fieldValues).toEqual({
            color: 'red'
        });
    });

    it('can be validated and pass', () => {
        const validator = jest.genMockFn();
        let form = TestUtils.renderIntoDocument(
            <Form validators={[validator]}>
                <label>Age: <Input name="age" type="text" /> </label>
            </Form>
        );
        const inputNode = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

        inputNode.value = '30';
        expect(form.serialize().valid).toBe(true);
    });

    it('can be validated and fail', () => {
        const validator = jest.genMockFunction().mockImplementation(() => 'kaboom');
        let form = TestUtils.renderIntoDocument(
            <Form validators={[validator]}>
                <label>Age: <Input name="age" type="text" /> </label>
            </Form>
        );
        const inputNode = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

        inputNode.value = '30';
        expect(form.serialize().valid).toBe(false);
        expect(form.serialize().errors).toEqual(['kaboom']);
    });
});
