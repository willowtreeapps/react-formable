jest.unmock('../maxLength');

describe('maxLength', () => {
    const maxLength = require('../maxLength').default(3, 'too long');

    it('returns nothing when value is long enough', () => {
        expect(maxLength('1')).toBe(undefined);
        expect(maxLength('12')).toBe(undefined);
        expect(maxLength('123')).toBe(undefined);
    });

    it('returns error message when value is too long', () => {
        expect(maxLength('1234')).toBe('too long');
        expect(maxLength('12345')).toBe('too long');
    });

    it('returns error message when value not a string', () => {
        expect(maxLength(null)).toBe('too long');
        expect(maxLength(undefined)).toBe('too long');
    });
});
