jest.dontMock('../form');
jest.dontMock('../inputs/input');

import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Form = require('../form').default;
const Input = require('../inputs/input').default;

describe('Form', () => {
    it('submits if the user hits enter', () => {
        const onSubmit = jest.genMockFn();
        let form = TestUtils.renderIntoDocument(
            <Form onSubmit={onSubmit}>
                <label> Pet Name: <Input className="petname" name="petname"
                type="text" /> </label>
            </Form>
        );

        const inputNode = TestUtils.findRenderedDOMComponentWithClass(form, 'petname');

        inputNode.value = 'george'
        TestUtils.Simulate.change(inputNode);
        TestUtils.Simulate.keyDown(inputNode, { key: 'Enter',
            keyCode: 13, which: 13 });

        expect(onSubmit).toBeCalled();
        expect(onSubmit.mock.calls[0][0].fieldValues).toEqual({
            petname: 'george'
        });
    });
});
