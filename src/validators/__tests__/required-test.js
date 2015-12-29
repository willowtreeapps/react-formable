jest.dontMock('../required');

const required = require('../required').default;

describe('validator:required', () => {
    it('renders with a className of errors', () => {
        let errors, errorIndex;

        errors = TestUtils.renderIntoDocument(<Errors />);
        errorIndex = ReactDOM.findDOMNode(errors).className.indexOf('errors');
        expect(errorIndex).not.toBe(-1);

        errors = TestUtils.renderIntoDocument(<Errors className="string" />);
        errorIndex = ReactDOM.findDOMNode(errors).className.indexOf('errors');
        expect(errorIndex).not.toBe(-1);
    });
});
