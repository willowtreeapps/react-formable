jest.dontMock('../pick');

describe('pick', () => {
    const pick = require('../pick').default;

    it('returns an object', () => {
        expect(pick([], {})).toEqual({});
    });

    it('selects picked keys', () => {
        const input = pick(['a'], { a: 1, b: 2 });
        const expectedOutput = { a: 1 };

        expect(input).toEqual(expectedOutput);
    });

    it('removes everything if no keys are matched', () => {
        const input = pick(['c'], { a: 1, b: 2 });
        const expectedOutput = {};

        expect(input).toEqual(expectedOutput);
    });

    it('doesnt modify the origional object', () => {
        const input = { a: 1, b: 2 };

        pick(['a', 'b'], input);

        expect(input).toEqual({ a: 1, b: 2 });
    });

    it('selects all keys if all keys are supplied', () => {
        const input = { a: 1, b: 2 };
        const expectedOutput = pick(['a', 'b'], input);

        expect(expectedOutput).toEqual(input);
    });
});
