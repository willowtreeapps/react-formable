jest.dontMock('../fieldset');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Fieldset = require('../fieldset').default;

describe('Fieldset', () => {
    it('renders with name of the fieldset', () => {
        let fieldset, fieldSetIndex;

        fieldset = TestUtils.renderIntoDocument(
            <Fieldset name="pet">
                <label> Pet Name: <Input name="name" type="text" /> </label>
                <label> Pet Type: <Input name="type" type="text" /> </label>
            </Fieldset>
        );
        fieldSetIndex = ReactDOM.findDOMNode(fieldset).className.indexOf('pet');
        expect(fieldSetIndex).not.toBe(-1);
    });
});
