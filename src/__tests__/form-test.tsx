/* tslint:disable: no-any */

jest.unmock('../form');
jest.unmock('../errors');
jest.unmock('../fieldset');
jest.unmock('../fieldlist');
jest.unmock('../inputs/input');
jest.unmock('./customInput');

import * as React from 'react';
const TestUtils = require('react-addons-test-utils');

const Form = require('../form').default;
const Errors = require('../errors').default;
const Input = require('../inputs/input').default;
const Fieldset = require('../fieldset').default;
const Fieldlist = require('../fieldlist').default;
const CustomInput = require('./customInput').default;

describe('Form', () => {
    it('submits if the user hits enter', () => {
        const onSubmit = jest.fn();
        let form: any = TestUtils.renderIntoDocument(
            <Form onSubmit={onSubmit}>
                <label> Pet Name: <Input name="petname" type="text" /> </label>
            </Form>
        );
        const inputNode: any = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

        inputNode.value = 'george';
        TestUtils.Simulate.change(inputNode);
        TestUtils.Simulate.keyDown(inputNode, { key: 'Enter',
            keyCode: 13, which: 13 });

        expect(onSubmit).toBeCalled();
        expect(onSubmit.mock.calls[0][0].fieldValues).toEqual({
            petname: 'george'
        });
    });

    it('triggers change if the form changes', () => {
        const onChange = jest.fn();
        let form: any = TestUtils.renderIntoDocument(
            <Form onChange={onChange}>
                <label> Favorite color: <Input name="color" type="text" /> </label>
            </Form>
        );
        const inputNode: any = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

        inputNode.value = 'red';
        TestUtils.Simulate.change(inputNode);

        expect(onChange).toBeCalled();
        expect(onChange.mock.calls[0][0].fieldValues).toEqual({
            color: 'red'
        });
    });

    it('can be validated and pass', () => {
        const validator = jest.fn();
        let form: any = TestUtils.renderIntoDocument(
            <Form validators={[validator]}>
                <label>Age: <Input name="age" type="text" /> </label>
            </Form>
        );
        const inputNode: any = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

        inputNode.value = '30';
        return form.serialize().validation.then(({ valid }) => expect(valid).toBe(true));
    });

    it('can be validated and fail', () => {
        const validator = jest.fn().mockImplementation(() => 'kaboom');
        let form: any = TestUtils.renderIntoDocument(
            <Form validators={[validator]}>
                <label>Age: <Input name="age" type="text" /> </label>
            </Form>
        );
        const inputNode: any = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

        inputNode.value = '30';

        return form.serialize().validation.then(errorObject => {
            expect(errorObject.valid).toBe(false);
            expect(errorObject.errors).toEqual(['kaboom']);
        });
    });

    xit('can show errors on change', () => {
        return new Promise(resolve => {
            let errorsComponent;

            function onChange(res) {
                console.log(res);
                console.log(res.validation);
                res.validation.then(errs => {
                    setTimeout(() => {
                        console.log('==============');
                        console.log('==============');
                        console.log(errorsComponent.props);
                        expect(errorsComponent.props.errors).toEqual(['kaboom']);
                        resolve();
                    }, 0);
                });
            }

            let DOM = TestUtils.renderIntoDocument(
                <Form showErrorsOnChange onChange={onChange}>
                    <Errors ref={(ref) => errorsComponent = ref} />
                    <Input name="age" type="text" />
                </Form>
            );

            const inputNode: any = TestUtils.findRenderedDOMComponentWithTag(DOM, 'input');
            inputNode.value = '30';
            TestUtils.Simulate.change(inputNode);
        });
    });

    it('does not show errors on change by default', () => {
        let errorsComponent;
        const validator = jest.fn(() => 'kaboom');
        let form: any = TestUtils.renderIntoDocument(
            <Form validators={[validator]}>
                <Errors ref={(ref) => errorsComponent = ref} />
                <label>Age: <Input name="age" type="text" /> </label>
            </Form>
        );
        const inputNode: any = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

        inputNode.value = '30';
        TestUtils.Simulate.change(inputNode);
        expect(errorsComponent.props.errors).not.toEqual(['kaboom']);
    });

    it('can prevent showing errors on submit', () => {
        let errorsComponent;
        const validator = jest.fn().mockImplementation(() => 'kaboom');
        let form: any = TestUtils.renderIntoDocument(
            <Form validators={[validator]} showErrorsOnSubmit={false}>
                <Errors ref={(ref) => errorsComponent = ref} />
                <label>Age: <Input name="age" type="text" /> </label>
            </Form>
        );
        const inputNode: any = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

        TestUtils.Simulate.keyDown(inputNode, { key: 'Enter',
            keyCode: 13, which: 13 });

        expect(errorsComponent.props.errors).not.toEqual(['kaboom']);
    });

    xit('does show errors on submit by default', () => {
        let errorsComponent;
        const validator = jest.fn().mockImplementation(() => 'kaboom');
        let form: any = TestUtils.renderIntoDocument(
            <Form validators={[validator]}>
                <Errors ref={(ref) => errorsComponent = ref} />
                <label>Age: <Input name="age" type="text" /> </label>
            </Form>
        );
        const inputNode: any = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

        TestUtils.Simulate.keyDown(inputNode, { key: 'Enter', keyCode: 13, which: 13 });

        expect(errorsComponent.props.errors).toEqual(['kaboom']);
    });

    it('can serialize the form', () => {
        const form: any = TestUtils.renderIntoDocument(
            <Form>
                <label>First name: <Input name="firstname" type="text" /> </label>
                <label>Last name: <Input name="lastname" type="text" /> </label>
                <Fieldset name="address">
                    <label>building: <Input name="building" type="text" /> </label>
                    <label>zip: <Input name="zip" type="text" /> </label>
                </Fieldset>
            </Form>
        );

        const vals = form.serialize();

        expect(vals.fieldValues).toEqual({
            address: {
                building: '',
                zip: ''
            },
            firstname: '',
            lastname: ''
        });

        return vals.validation.then(validation => {
            expect(validation).toEqual({
                valid: true,
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
    });

    it('can serialize the form with validators', () => {
        const failVal = jest.fn(() => 'kaboom');
        const form: any = TestUtils.renderIntoDocument(
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

        const vals = form.serialize();

        expect(vals.fieldValues).toEqual({
            address: {
                building: 'Empire State',
                zip: ''
            },
            firstname: '',
            lastname: ''
        });

        return vals.validation.then(validation => {
            expect(validation).toEqual({
                valid: false,
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
    });

    it('it checks for the existance of ref before using it in serialize', () => {
        const Icon = props => <i />;

        const form: any = TestUtils.renderIntoDocument(
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
        const onChange = jest.fn();
        const onSubmit = jest.fn();
        const form: any = TestUtils.renderIntoDocument(
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

    describe('validates asynchronously', () => {
        it('validates an form without any validators', () => {
            let form = TestUtils.renderIntoDocument(
                <Form>
                    <Input name="age" type="text" />
                </Form>
            );

            const serial = form.serialize();
            expect(serial.fieldValues.age).toBe('');
            return serial.validation.then(res => {
                expect(res).toEqual({
                    valid: true,
                    fieldErrors: {
                        age: []
                    },
                    errors: []
                });
            });
        });

        it('validates a single asynchronous input 1', () => {
            const validator = () => Promise.resolve('bad');
            const validator2 = () => Promise.resolve('bad2');
            const validator3 = () => Promise.reject('bad3');

            let form = TestUtils.renderIntoDocument(
                <Form validators={[validator3]}>
                    <Input name="age" type="text" validators={[validator, validator2]} />
                </Form>
            );

            const serial = form.serialize();
            expect(serial.fieldValues.age).toBe('');
            return serial.validation.then(res => {
                expect(res).toEqual({
                    valid: false,
                    fieldErrors: {
                        age: ['bad', 'bad2']
                    },
                    errors: ['bad3', 'bad', 'bad2']
                });
            });
        });

        it('validates a single asynchronous input 2', () => {
            const validator = () => Promise.reject('bad');

            let form = TestUtils.renderIntoDocument(
                <Form>
                    <Input name="age" type="text" validators={[validator] }/>
                </Form>
            );

            const serial = form.serialize();
            expect(serial.fieldValues.age).toBe('');
            return serial.validation.catch(res => {
                expect(res).toEqual({
                    valid: false,
                    errors: ['bad'],
                    fieldErrors: {
                        age: ['bad']
                    }
                });
            });
        });

        it('validates a single asynchronous input 2', () => {
            let form = TestUtils.renderIntoDocument(
                <Form>
                    <Input name="one" type="text" validators={[
                        () => Promise.resolve('bad')
                    ]}/>

                    <Input name="two" type="text" validators={[
                        (value, fValues, fErrors) => {
                            if (fErrors && fErrors.one.length) {
                                return Promise.reject('sad');
                            }
                        }
                    ]}/>
                </Form>
            );

            const serial = form.serialize();
            return serial.validation.catch(res => {
                expect(res).toEqual({
                    valid: false,
                    errors: ['bad', 'sad'],
                    fieldErrors: {
                        one: ['bad'],
                        two: ['sad']
                    }
                });
            });
        });

        it('validates a single asynchronous input 2', () => {
            let form = TestUtils.renderIntoDocument(
                <Form>
                    <Input name="one" type="text" validators={[
                    ]}/>

                    <Input name="two" type="text" validators={[
                        (value, fValues, fErrors) => {
                            if (fErrors && fErrors.one.length) {
                                return 'sad';
                            }
                        }
                    ]}/>
                </Form>
            );

            const serial = form.serialize();
            return serial.validation.catch(res => {
                expect(res).toEqual({
                    valid: true,
                    errors: [],
                    fieldErrors: {
                        one: [],
                        two: []
                    }
                });
            });
        });
    });
});
