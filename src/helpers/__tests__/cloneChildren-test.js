import React from 'react';
jest.dontMock('../cloneChildren');

describe('cloneChildren', () => {
    const cloneChildren = require('../cloneChildren').default;

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
});
