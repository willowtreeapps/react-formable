jest.dontMock('../equalsField');

const equalsField = require('../equalsField').default;

describe('required', () => {
    it('returns nothing when other form field is equal', () => {
        let validator = equalsField('password2', 'must be equal');

        expect(validator('ABC', {
            password2: 'ABC'
        })).toBe(undefined);
    });

    it('returns error message when form field is different', () => {
        let validator = equalsField('password2', 'must be equal');

        expect(validator('ABC', {
            password2: 'DEF'
        })).toBe('must be equal');
    });

    it('returns nothing when other nested form field is equal', () => {
        let validator = equalsField('deep.nested.field', 'must be equal');

        expect(validator('ABC', {
            deep: {
                nested: {
                    field: 'ABC'
                }
            }
        })).toBe(undefined);
    });

    it('returns error message when nested form field is different', () => {
        let validator = equalsField('deep.nested.field', 'must be equal');

        expect(validator('ABC', {
            deep: {
                nested: {
                    field: 'DEF'
                }
            }
        })).toBe('must be equal');
    });
});
