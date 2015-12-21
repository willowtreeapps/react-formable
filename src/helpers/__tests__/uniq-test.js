jest.dontMock('../uniq');

describe('uniq', () => {
    const uniq = require('../uniq').default;

    it('returns an array', () => {
        expect(uniq([])).toEqual([]);
    });

    it('removes duplicate strings', () => {
        const input = uniq(['a', 'a', 'a']);
        const expectedOutput = ['a'];

        expect(input).toEqual(expectedOutput);
    });

    it('doesnt modify the origional object', () => {
        const input = ['a', 'a'];

        uniq(input);

        expect(input).toEqual(['a', 'a']);
    });

    it('preserves order within an array', () => {
        const input = uniq(['a', 'b', 'a', 'c', 'b']);
        const expectedOutput = uniq(input);

        expect(expectedOutput).toEqual(['a', 'b', 'c']);
    });

    it('does not compact unnecessarily', () => {
        const input = uniq(['a', 'b', 'c']);
        const expectedOutput = uniq(input);

        expect(expectedOutput).toEqual(['a', 'b', 'c']);
    });
});
