jest.dontMock('../equalsField');

const equalsField = require('../equalsField').default('password2', 'must be equal');

describe('required', () => {
    it('returns nothing when other form field is equal', () => {
        expect(equalsField('ABC', {
            password2: 'ABC'
        })).toBe(undefined);
    });

    it('returns error message when form field is different', () => {
        expect(equalsField('ABC', {
            password2: 'DEF'
        })).toBe('must be equal');
    });
});
