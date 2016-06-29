jest.unmock('../greaterThan');

describe('greaterThan', () => {
    const greaterThan = require('../greaterThan').default(3, 'too short');

    it('returns nothing when value is large enough', () => {
        expect(greaterThan(3.1)).toBe(undefined);
        expect(greaterThan('3.1')).toBe(undefined);
        expect(greaterThan(4)).toBe(undefined);
    });

    it('returns error message when value is too small', () => {
        expect(greaterThan('1')).toBe('too short');
        expect(greaterThan(1)).toBe('too short');
        expect(greaterThan(2.9)).toBe('too short');
        expect(greaterThan(3)).toBe('too short');
    });
});
