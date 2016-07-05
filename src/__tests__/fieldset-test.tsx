/* tslint:disable: no-any */

jest.unmock('../fieldset');
jest.unmock('../inputs/input');

import * as React from 'react';
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const Fieldset = require('../fieldset').default;
const Input = require('../inputs/input').default;

describe('Fieldset', () => {
    it('renders div with name of the fieldset', () => {
        let fieldset: any = TestUtils.renderIntoDocument(
            <Fieldset name="pet">
                <label> Pet Name: <Input name="name" type="text" /> </label>
                <label> Pet Type: <Input name="type" type="text" /> </label>
            </Fieldset>
        );

        const fieldsetNode = ReactDOM.findDOMNode(fieldset);

        expect(fieldsetNode.getAttribute('name')).toBe('pet');
    });

    it('can get inputs', () => {
        let fieldset: any = TestUtils.renderIntoDocument(
            <Fieldset name="pet">
                <label> Pet Name: <Input name="name" type="text"
                    value="george" /> </label>
                <label> Pet Type: <Input name="type" type="text"
                    value="dog" /> </label>
            </Fieldset>
        );

        const inputs = fieldset.getInputs();

        expect(inputs.value).toEqual(fieldset);
        expect(inputs.children.name.value.getValue()).toBe('george');
        expect(inputs.children.type.value.getValue()).toBe('dog');
    });
});
