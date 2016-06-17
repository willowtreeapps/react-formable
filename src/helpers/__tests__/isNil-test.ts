jest.dontMock('../isNil');

describe('isNil', () => {
    const isNil = require('../isNil').default;

    it('returns true if it encounters null', () => {
        expect(isNil(null)).toBe(true);
    });

    it('returns true if it encounters undefined', () => {
        expect(isNil(undefined)).toBe(true);
    });

    it('returns false if it encounters other falsy values', () => {
        expect(isNil(false)).toBe(false);
        expect(isNil(0)).toBe(false);
        expect(isNil('')).toBe(false);
    });

    it('returns false if it encounters other truthy values', () => {
        expect(isNil(1)).toBe(false);
        expect(isNil('test')).toBe(false);
        expect(isNil({})).toBe(false);
        expect(isNil({ name: 1 })).toBe(false);
    });
});
