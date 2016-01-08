import React from 'react';
jest.dontMock('../cloneChildren');
jest.dontMock('../../errors');

describe('cloneChildren', () => {
    const cloneChildren = require('../cloneChildren').default;
    const createErrorsRule = require('../cloneChildren').createErrorsRule;
    const createFormableRule = require('../cloneChildren').createFormableRule;

    const Errors = require('../../errors').default;
    const Input = require('../../inputs/input').default;

    it('clones when predicate matches', () => {
        const rule = {
            predicate: () => true,
            clone: (child) => {
                return React.cloneElement(child, { color: 'red' });
            }
        };

        const children = [<div></div>, <h4></h4>];
        const clones = cloneChildren([rule], children);

        expect(clones.length).toBe(2);
        clones.forEach((clone) => {
            expect(clone.props.color).toBe('red');
        });
    });

    it('skips clone when predicate fails', () => {
        const rule = {
            predicate: () => false,
            clone: (child) => {
                return React.cloneElement(child, { color: 'red' });
            }
        };

        const children = [<div></div>, <h4></h4>];
        const clones = cloneChildren([rule], children);

        expect(clones.length).toBe(2);
        clones.forEach((clone) => {
            expect(clone.props.color).toBe(undefined);
        });
    });

    it('clones Errrors and populates errors fields', () => {
        const rule = createErrorsRule({
            errors: ['Some bad error'],
            fieldErrors: {
                fieldname: 'Some bad error'
            }
        });

        const children = [<Errors />];
        const errorsClone = cloneChildren([rule], children)[0];

        expect(errorsClone.props.fieldErrors.fieldname).toBe('Some bad error');
        expect(errorsClone.props.errors[0]).toBe('Some bad error');
    });

    it('clones leaf nodes as expected', () => {
        const children = [<p>hello</p>];
        const pTagClone = cloneChildren([], children)[0];

        expect(pTagClone.props.children[0]).toBe('hello');
    });

    it('warns when children share same name', () => {
        const rule = createFormableRule({})
        const children = [
            <Input name="color" type="text" />,
            <Input name="color" type="text" />
        ];
        const clones = cloneChildren([rule], children);

        expect(clones.length).toBe(2);
    });
});
