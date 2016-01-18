jest.dontMock('../fieldlist');
jest.dontMock('../inputs/input');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Fieldlist = require('../fieldlist').default;
const Input = require('../inputs/input').default;

describe('Fieldlist', () => {
    it('write test', () => {
        let fieldlist = TestUtils.renderIntoDocument(
            <Fieldlist name="pets">
                <div>
                    <label> Pet Name: <Input name="name" type="text" /> </label>
                    <label> Pet Type: <Input name="type" type="text" /> </label>
                </div>
            </Fieldlist>
        );
        const fieldlistNode = ReactDOM.findDOMNode(fieldlist);

        expect(fieldlistNode).not.toBeNull();
    });
});
