jest.dontMock('../required');

const required = require('../required').default('missing value');

describe('required', () => {
    it('returns error message when values are missing', () => {
        expect(required(null)).toBe('missing value');
        expect(required(undefined)).toBe('missing value');
    });

    it('returns nothing when values are passed', () => {
        expect(required('a value')).toBe(undefined);
        expect(required(2)).toBe(undefined);
    });

    it('returns error message for whitespace string', () => {
        expect(required('')).toBe('missing value');
        expect(required(' ')).toBe('missing value');
    });

    it('returns nothing for non empty object', () => {
        expect(required({
            a: 1
        })).toBe(undefined);
    });

    it('returns error message for empty object', () => {
        expect(required({})).toBe('missing value');
    });
});
