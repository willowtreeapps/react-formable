jest.dontMock('../omit');

describe('omit', () => {
    const omit = require('../omit').default;

    it('returns an object', () => {
        expect(omit([], {})).toEqual({});
    });

    it('strips ommited keys', () => {
        const input = omit(['a'], { a: 1, b: 2 });
        const expectedOutput = { b: 2 };

        expect(input).toEqual(expectedOutput);
    });

    it('doesnt remove anything if no keys are matched', () => {
        const input = omit(['c'], { a: 1, b: 2 });
        const expectedOutput = { a: 1, b: 2 };

        expect(input).toEqual(expectedOutput);
    });

    it('doesnt modify the origional object', () => {
        const input = { a: 1, b: 2 };

        omit(['a', 'b'], input);

        expect(input).toEqual({ a: 1, b: 2 });
    });

    it('removes all keys if all keys are supplied', () => {
        const expectedOutput = omit(['a', 'b'], { a: 1, b: 2 });
        
        expect(expectedOutput).toEqual({});
    });
});
