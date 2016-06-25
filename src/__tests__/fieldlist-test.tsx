/* tslint:disable: no-any */

jest.unmock('../form');
jest.unmock('../fieldlist');
jest.unmock('../fieldset');
jest.unmock('../inputs/input');
jest.unmock('../validators/required');

import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';

const Form = require('../form').default;
const Fieldlist = require('../fieldlist').default;
const Input = require('../inputs/input').default;
const required = require('../validators/required').default;

describe('Fieldlist', () => {
    it('serializes each list item appropriately', () => {
        const items = [1, 2, 3];
        let form: any = TestUtils.renderIntoDocument(
            <Form>
                <Fieldlist name="pets">
                    {items.map((i) =>
                         <div key={i}>
                            <label> Pet Name: <Input name="name" type="text" /> </label>
                        </div>
                    )};
                </Fieldlist>
            </Form>
        );
        const inputs: any[] = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input');

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
        let form: any = TestUtils.renderIntoDocument(
            <Form>
                <Fieldlist name="pets">
                    {items.map((i) =>
                        <div key={i}>
                            <label> Pet Name: <Input name="name" type="text"
                                validators={[required(`name${i} is required`)]} /> </label>
                        </div>
                    )};
                </Fieldlist>
            </Form>
        );
        const inputs = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input');

        TestUtils.Simulate.change(inputs[0]);

        expect(form.serialize().fieldErrors).toEqual({
            pets: [{ name: ['name1 is required'] },
                { name: ['name2 is required'] },
                { name: ['name3 is required'] }
            ]
        });
    });

    it('handles errors appropriately', () => {
        const items = [1, 2, 3];
        let form: any = TestUtils.renderIntoDocument(
            <Form>
                <Fieldlist name="pets">
                    {items.map((i) =>
                        <div key={i}>
                            <label> Pet Name: <Input name="name" type="text"
                                validators={[required(`name${i} is required`)]} /> </label>
                        </div>
                    )}
                </Fieldlist>
            </Form>
        );
        const inputs = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input');

        TestUtils.Simulate.change(inputs[0]);

        expect(form.serialize().errors).toEqual(['name1 is required',
            'name2 is required', 'name3 is required']);
    });
});
