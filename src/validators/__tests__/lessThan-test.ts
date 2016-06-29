jest.unmock('../lessThan');

describe('lessThan', () => {
    const lessThan = require('../lessThan').default(3, 'too long');

    it('returns nothing when value is small enough', () => {
        expect(lessThan('1')).toBe(undefined);
        expect(lessThan(1)).toBe(undefined);
        expect(lessThan(2.9)).toBe(undefined);
    });

    it('returns error message when value is too big', () => {
        expect(lessThan(3)).toBe('too long');
        expect(lessThan('3.1')).toBe('too long');
        expect(lessThan(4)).toBe('too long');
    });
});
