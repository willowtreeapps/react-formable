jest.dontMock('../mapObj');

describe('mapObj', () => {
    const mapObj = require('../mapObj').default;

    it('returns an object', () => {
        expect(mapObj({})).toEqual({});
    });

    it('does not modify the origional object', () => {
        let origional = { a: 1 };

        mapObj(x => x*2, origional);

        expect(origional).toEqual({ a: 1 });
    });

    it('modifies the values of an object', () => {
        const origional = { a: 1 };

        const modified = mapObj(x => x*2, origional);

        expect(modified).toEqual({ a: 2 });
    });
});
