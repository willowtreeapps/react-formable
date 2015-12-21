jest.dontMock('../uuid');

describe('uuid', () => {
    const uuid = require('../uuid').default;

    it('returns a number', () => {
        expect(typeof uuid()).toEqual('number');
    });
});
