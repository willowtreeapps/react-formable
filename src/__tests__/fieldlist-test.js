jest.dontMock('../form');
jest.dontMock('../fieldlist');
jest.dontMock('../fieldset');
jest.dontMock('../inputs/input');
jest.dontMock('../inputs/input')
jest.dontMock('../validators/required')

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Form = require('../form').default;
const Fieldlist = require('../fieldlist').default;
const Input = require('../inputs/input').default;
const required = require('../validators/required').default;

describe('Fieldlist', () => {
    it('serializes each list item appropriately', () => {
        const items = [1, 2, 3];
        let form = TestUtils.renderIntoDocument(
            <Form>
                <Fieldlist name="pets">
                    {items.map((i) => {
                        return <div key={i}>
                            <label> Pet Name: <Input name="name" type="text" /> </label>
                        </div>
                    })};
                </Fieldlist>
            </Form>
        );
        const inputs = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input');

        inputs.forEach((input, i) => {
            input.value = `george${i}`;
            TestUtils.Simulate.change(input);
        });

        expect(form.serialize().fieldValues).toEqual({
            pets: [{ name: 'george0' },
                { name: 'george1' },
                { name: 'george2' }
            ]
        });
    });

    it('handles field errors appropriately', () => {
        const items = [1, 2, 3];
        let form = TestUtils.renderIntoDocument(
            <Form>
                <Fieldlist name="pets">
                    {items.map((i) => {
                        return <div key={i}>
                            <label> Pet Name: <Input name="name" type="text"
                                validators={[required(`name${i} is required`)]} /> </label>
                        </div>
                    })};
                </Fieldlist>
            </Form>
        );
        const inputs = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input');

        TestUtils.Simulate.change(inputs[0]);

        expect(form.serialize().fieldErrors).toEqual({
            pets: [
                {
                  'name': [
                    'name1 is required'
                  ]
                },
                {
                  'name': [
                    'name2 is required'
                  ]
                },
                {
                  'name': [
                    'name3 is required'
                  ]
                }
            ]
        });
    });

    it('handles field errors appropriately', () => {
        const items = [1, 2, 3];
        let form = TestUtils.renderIntoDocument(
            <Form>
                <Fieldlist name="pets">
                    {items.map((i) => {
                        return <div key={i}>
                            <label> Pet Name: <Input name="name" type="text"
                                validators={[required(`name${i} is required`)]} /> </label>
                        </div>
                    })};
                </Fieldlist>
            </Form>
        );
        const inputs = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input');

        TestUtils.Simulate.change(inputs[0]);

        expect(form.serialize().fieldErrors).toEqual({
            pets: [
                { name: ['name1 is required'] },
                { name: ['name2 is required'] },
                { name: ['name3 is required'] }
            ]
        });
    });
});
