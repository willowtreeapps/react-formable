jest.dontMock('../test');

const test = require('../test').default(/(\w+)\s(\w+)/, 'test failed');

describe('required', () => {
    it('returns nothing when test passes', () => {
        expect(test('john smith')).toBe(undefined);
    });

    it('returns error message when test fails', () => {
        expect(test('john')).toBe('test failed');
    });
});
