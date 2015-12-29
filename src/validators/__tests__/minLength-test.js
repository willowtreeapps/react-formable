jest.dontMock('../minLength');

const minLength = require('../minLength').default(3, 'too short');

describe('minLength', () => {
    it('returns nothing when value is long enough', () => {
        expect(minLength('12345')).toBe(undefined);
        expect(minLength('123')).toBe(undefined);
    });

    it('returns error message when value is too short', () => {
        expect(minLength('')).toBe('too short');
        expect(minLength('1')).toBe('too short');
        expect(minLength('12')).toBe('too short');
    });

    it('returns error message when value not a string', () => {
        expect(minLength(null)).toBe('too short');
        expect(minLength(undefined)).toBe('too short');        
    });
});
