jest.dontMock('../fieldset');
jest.dontMock('../inputs/input');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Fieldset = require('../fieldset').default;
const Input = require('../inputs/input').default;

describe('Fieldset', () => {
    it('renders with name of the fieldset', () => {
        let fieldset = TestUtils.renderIntoDocument(
            <Fieldset name="pet">
                <label> Pet Name: <Input name="name" type="text" /> </label>
                <label> Pet Type: <Input name="type" type="text" /> </label>
            </Fieldset>
        );

        var fieldsetNode = ReactDOM.findDOMNode(fieldset);
        debugger;

        // Object.keys(fieldsetNode).map((name) => { console.log(name) });

        // console.log(fieldsetNode.name);
    });
});
