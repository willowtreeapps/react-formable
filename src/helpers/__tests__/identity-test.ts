jest.dontMock('../identity');

describe('identity', () => {
    const identity = require('../identity').default;

    it('returns its first input', () => {
        expect(identity(1)).toBe(1);
    });
});
