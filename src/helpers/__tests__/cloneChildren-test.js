jest.dontMock('../cloneChildren');

describe('cloneChildren', () => {
    const cloneChildren = require('../cloneChildren').default;

    // TODO: We need to really test this function
    xit('returns an array', () => {
        expect(Array.isArray(cloneChildren({}))).toBe(true);
    });
});
