jest.dontMock('../keys');

describe('keys', () => {
    const keys = require('../keys').default;

    it('returns an array', () => {
        expect(Array.isArray(keys({}))).toBe(true);
    });

    it('returns the keys of an object', () => {
        const obj = {
            a: 1,
            b: 2
        };

        expect(keys(obj).length).toBe(2);
    });
});
