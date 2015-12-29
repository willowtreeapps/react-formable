jest.dontMock('../required');

const required = require('../required').default;

describe('required', () => {
    it('fail', () => {
        expect(1).not.toBe(1);
    });
});
