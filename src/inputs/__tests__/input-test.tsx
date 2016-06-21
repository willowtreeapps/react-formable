jest.unmock('../input');

/* tslint:disable: no-any */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';

const Input = require('../input').default;

describe('Input', () => {
    it('has a class of "error" when fieldErrors are present', () => {
        const input: any = TestUtils.renderIntoDocument(
            <Input fieldErrors={['error']} />
        );

        const inputNode = ReactDOM.findDOMNode(input);
        const errorIndex = inputNode.className.indexOf('error');

        expect(errorIndex).not.toBe(-1);
    });

    it('does not fire onChange when validateOnBlur is true', () => {
        const onChangeCallback = jest.fn();
        const input: any = TestUtils.renderIntoDocument(
            <Input validateOnBlur onChange={onChangeCallback} />
        );

        TestUtils.Simulate.change(
            TestUtils.findRenderedDOMComponentWithTag(input, 'input')
        );

        expect(onChangeCallback.mock.calls.length).toBe(0);

        TestUtils.Simulate.blur(
            TestUtils.findRenderedDOMComponentWithTag(input, 'input')
        );

        expect(onChangeCallback.mock.calls.length).toBe(1);
    });

    it('fires onChange when validateOnBlur is false', () => {
        const onChangeCallback = jest.fn();
        const input: any = TestUtils.renderIntoDocument(
            <Input onChange={onChangeCallback} />
        );

        TestUtils.Simulate.change(
            TestUtils.findRenderedDOMComponentWithTag(input, 'input')
        );

        expect(onChangeCallback.mock.calls.length).toBe(1);

        TestUtils.Simulate.blur(
            TestUtils.findRenderedDOMComponentWithTag(input, 'input')
        );

        expect(onChangeCallback.mock.calls.length).toBe(1);
    });

    it('returns the appropriate value from getValue', () => {
        const input: any = TestUtils.renderIntoDocument(
            <Input />
        );
        const inputNode: any = ReactDOM.findDOMNode(input);

        inputNode.value = 'a';

        expect(input.getValue()).toBe('a');
    });
});
