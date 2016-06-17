jest.dontMock('../values');

describe('values', () => {
    const values = require('../values').default;

    it('returns an array', () => {
        expect(Array.isArray(values({}))).toBe(true);
    });

    it('returns an empty array for empty objects', () => {
        expect(values({})).toEqual([]);
    });

    it('returns the values of an object', () => {
        const obj = {
            a: 1,
            b: 2
        };

        expect(values(obj)).toEqual([1, 2]);
    });

    it('preserves key order', () => {
        const obj = {
            a: 1,
            c: 3,
            b: 2
        };

        expect(values(obj)).toEqual([1, 3, 2]);
    });
});
