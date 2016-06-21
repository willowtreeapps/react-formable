jest.dontMock('../compose');

describe('compose', () => {
    const compose = require('../compose').default;

    it('returns a function', () => {
        const i = function () {};

        expect(typeof compose(i, i)).toBe('function');
    });

    it('calls the functions in right to left order', () => {
        let x = 0;

        const first = function () {x++;};
        const second = function () {x = x*2;};

        compose(second, first)();

        expect(x).toBe(2);

        const testValues = [1, 2, 3, 4];

        const map = (data) => data.map(number => number * 2);
        const sum = (data) => data.reduce((memo, number) => memo + number);
        const total = compose(sum, map);

        expect(total(testValues)).toBe(20);
    });
});
