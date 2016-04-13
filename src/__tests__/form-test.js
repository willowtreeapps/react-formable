jest.dontMock('../form');
jest.dontMock('../errors');
jest.dontMock('../fieldset');
jest.dontMock('../fieldlist');
jest.dontMock('../inputs/input');
jest.dontMock('./customInput');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Form = require('../form').default;
const Errors = require('../errors').default;
const Input = require('../inputs/input').default;
const Fieldset = require('../fieldset').default;
const Fieldlist = require('../fieldlist').default;
const CustomInput = require('./customInput').default;

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

    it('can show errors on change', () => {
        let errorsComponent;
        const validator = jest.genMockFunction().mockImplementation(() => 'kaboom');
        let form = TestUtils.renderIntoDocument(
            <Form validators={[validator]} showErrorsOnChange={true}>
                <Errors ref={(ref) => errorsComponent = ref} />
                <label>Age: <Input name="age" type="text" /> </label>
            </Form>
        );
        const inputNode = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

        inputNode.value = '30';
        TestUtils.Simulate.change(inputNode);
        expect(errorsComponent.props.errors).toEqual(['kaboom']);
    });

    it('does not show errors on change by default', () => {
        let errorsComponent;
        const validator = jest.genMockFunction().mockImplementation(() => 'kaboom');
        let form = TestUtils.renderIntoDocument(
            <Form validators={[validator]}>
                <Errors ref={(ref) => errorsComponent = ref} />
                <label>Age: <Input name="age" type="text" /> </label>
            </Form>
        );
        const inputNode = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

        inputNode.value = '30';
        TestUtils.Simulate.change(inputNode);
        expect(errorsComponent.props.errors).not.toEqual(['kaboom']);
    });

    it('can prevent showing errors on submit', () => {
        let errorsComponent;
        const validator = jest.genMockFunction().mockImplementation(() => 'kaboom');
        let form = TestUtils.renderIntoDocument(
            <Form validators={[validator]} showErrorsOnSubmit={false}>
                <Errors ref={(ref) => errorsComponent = ref} />
                <label>Age: <Input name="age" type="text" /> </label>
            </Form>
        );
        const inputNode = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

        TestUtils.Simulate.keyDown(inputNode, { key: 'Enter',
            keyCode: 13, which: 13 });

        expect(errorsComponent.props.errors).not.toEqual(['kaboom']);
    });

    it('does show errors on submit by default', () => {
        let errorsComponent;
        const validator = jest.genMockFunction().mockImplementation(() => 'kaboom');
        let form = TestUtils.renderIntoDocument(
            <Form validators={[validator]}>
                <Errors ref={(ref) => errorsComponent = ref} />
                <label>Age: <Input name="age" type="text" /> </label>
            </Form>
        );
        const inputNode = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

        TestUtils.Simulate.keyDown(inputNode, { key: 'Enter',
            keyCode: 13, which: 13 });

        expect(errorsComponent.props.errors).toEqual(['kaboom']);
    });

    it('can serialize the form', () => {
        const form = TestUtils.renderIntoDocument(
            <Form>
                <label>First name: <Input name="firstname" type="text" /> </label>
                <label>Last name: <Input name="lastname" type="text" /> </label>
                <Fieldset name="address">
                    <label>building: <Input name="building" type="text" /> </label>
                    <label>zip: <Input name="zip" type="text" /> </label>
                </Fieldset>
            </Form>
        );

        expect(form.serialize()).toEqual({
            valid: true,
            fieldValues: {
                address: {
                    building: '',
                    zip: ''
                },
                firstname: '',
                lastname: ''
            },
            fieldErrors: {
                address: {
                    building: [],
                    zip: []
                },
                firstname: [],
                lastname: []
            },
            errors: []
        });
    });

    it('can serialize the form with validators', () => {
        const failVal = jest.genMockFunction().mockImplementation(() => 'kaboom');
        const form = TestUtils.renderIntoDocument(
            <Form>
                <label>First name: <Input name="firstname" type="text" /> </label>
                <label>Last name: <Input name="lastname" type="text" /> </label>
                <Fieldset name="address">
                    <label>building: <Input name="building" type="text"
                        value="Empire State" /> </label>
                    <label>zip: <Input name="zip" type="text"
                        validators={[failVal]} /> </label>
                </Fieldset>
            </Form>
        );

        expect(form.serialize()).toEqual({
            valid: false,
            fieldValues: {
                address: {
                    building: 'Empire State',
                    zip: ''
                },
                firstname: '',
                lastname: ''
            },
            fieldErrors: {
                address: {
                    building: [],
                    zip: ['kaboom']
                },
                firstname: [],
                lastname: []
            },
            errors: ['kaboom']
        });
    });

    it('it checks for the existance of ref before using it in serialize', () => {
        const Icon = props => <i {...props} />;

        const form = TestUtils.renderIntoDocument(
            <Form>
                <Input name="firstname" type="text" />
                <Icon name="icon" />
            </Form>
        );

        expect(form.serialize().fieldValues).toEqual({
            firstname: ''
        });
    });

    it('it passes down callbacks in fieldset and fieldlists', () => {
        const onChange = jest.genMockFn();
        const onSubmit = jest.genMockFn();
        const form = TestUtils.renderIntoDocument(
            <Form onChange={onChange}
                  onSubmit={onSubmit}
                  className="form">
                <Fieldset name="one">
                    <CustomInput name="two" className="two" />
                </Fieldset>
                <Fieldlist name="three">
                    <CustomInput name="four" className="four" />
                </Fieldlist>
            </Form>
        );

        // Make sure the form serializes properly first
        expect(form.serialize().fieldValues).toEqual({
            one: { two: false },
            three: [
                { four: false }
            ]
        });

        // Click on both inputs to toggle them to true
        const two = TestUtils.findRenderedDOMComponentWithClass(form, 'two');
        const four = TestUtils.findRenderedDOMComponentWithClass(form, 'four');
        
        TestUtils.Simulate.click(two);
        TestUtils.Simulate.click(four);

        expect(onChange).toBeCalled();
        expect(onChange.mock.calls[1][0].fieldValues).toEqual({
            one: { two: true },
            three: [
                { four: true }
            ]
        });
    });
});
