jest.dontMock('../flatten');

describe('flatten', () => {
    const flatten = require('../flatten').default;

    it('returns an array', () => {
        expect(Array.isArray(flatten([1, 2, [3]]))).toBe(true);
    });

    it('flattens multiple arrays into a single array', () => {
        const array1 = [1, 2, 3];
        const array2 = [4, 5, 6];
        const value = 7;

        expect(flatten([array1, array2, value]).length).toBe(7);
    });

    it('will only unnest arrays one level (shallow)', () => {
        const array = [1, 2, 3];
        const value = 4;
        const nestedArray = [[5, 6], [7, 8], 9];

        expect(flatten([array, value, nestedArray]).length).toBe(7);
    });
});
