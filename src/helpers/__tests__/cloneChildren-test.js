jest.autoMockOff();
jest.mock('warning');
const React = require('react');
const Errors = require('../../errors').default;
const Input = require('../../inputs/input').default;
const Fieldset = require('../../fieldset').default;
const cloneChildren = require('../cloneChildren').default;

describe('cloneChildren', () => {
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

    it('clones Errors and populates errors fields', () => {
        const createErrorsRule = require('../cloneChildren').createErrorsRule;
        const rule = createErrorsRule(['Some bad error'], {
            fieldname: 'Some bad error'
        });
        const children = [<Errors />];
        const errorsClone = cloneChildren([rule], children);

        expect(errorsClone.props.fieldErrors.fieldname).toBe('Some bad error');
        expect(errorsClone.props.errors[0]).toBe('Some bad error');
    });

    it('clones leaf nodes as expected', () => {
        const children = [<p>hello</p>];
        const pTagClone = cloneChildren([], children);

        expect(pTagClone.props.children).toBe('hello');
    });

    it('warns when children share same name', () => {
        const warning = require('warning');
        const rule = require('../cloneChildren').createFormableRule();
        const children = [
            <Input name="color" type="text" />,
            <Input name="color" type="text" />
        ];

        cloneChildren([rule], children);
        expect(warning).toBeCalledWith(false, 'Duplicate name "color" found. Duplicate fields will be ignored');
    });

    it('does not warn when children have different names', () => {
        const warning = require('warning');
        const rule = require('../cloneChildren').createFormableRule();
        const children = [
            <Input name="color" type="text" />,
            <Input name="shape" type="text" />
        ];

        cloneChildren([rule], children);
        expect(warning).not.toBeCalledWith(false, 'Duplicate name "color" found. Duplicate fields will be ignored');
        expect(warning).not.toBeCalledWith(false, 'Duplicate name "shape" found. Duplicate fields will be ignored');
    });

    it('does not warn when children have same names but are scoped', () => {
        const warning = require('warning');
        const rule = require('../cloneChildren').createFormableRule();
        const children = [
            <Input name="color" type="text" />,
            <Fieldset name="pet">
                <Input name="color" type="text" />
            </Fieldset>
        ];

        cloneChildren([rule], children);
        expect(warning).not.toBeCalledWith(false, 'Duplicate name "color" found. Duplicate fields will be ignored');
    });

    it('warns when children have same names using recursion (unscoped)', () => {
        const warning = require('warning');
        const rule = require('../cloneChildren').createFormableRule();

        const children = [
            <Input name="color" type="text" />,
            <div>
                <Input name="color" type="text" />
            </div>
        ];

        cloneChildren([rule], children);
        expect(warning).toBeCalledWith(false, 'Duplicate name "color" found. Duplicate fields will be ignored');
    });

    it('returns a single child (not an array of one) when cloning a single child', () => {
        const createFormableRule = require('../cloneChildren').createFormableRule;
        const rule = createFormableRule({})
        const children = <p>some sub element</p>;
        const clone = cloneChildren([rule], children);

        expect(React.Children.only(clone)).toBe(clone);
    })
});
