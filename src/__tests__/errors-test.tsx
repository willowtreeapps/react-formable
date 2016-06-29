jest.unmock('../errors');

import * as React from 'react';
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const Errors = require('../errors').default;

describe('Errors', () => {
    it('renders with a className of errors', () => {
        let errors, errorIndex;

        errors = TestUtils.renderIntoDocument(<Errors />);
        errorIndex = ReactDOM.findDOMNode(errors).className.indexOf('errors');
        expect(errorIndex).not.toBe(-1);

        errors = TestUtils.renderIntoDocument(<Errors className="string" />);
        errorIndex = ReactDOM.findDOMNode(errors).className.indexOf('errors');
        expect(errorIndex).not.toBe(-1);
    });

    it('renders errors passed into it', () => {
        let errors;

        errors = TestUtils.renderIntoDocument(<Errors />);
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(0);

        errors = TestUtils.renderIntoDocument(<Errors errors={[]} />);
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(0);

        errors = TestUtils.renderIntoDocument(<Errors errors={['one', 'one', 'two']} />);
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(3);
    });

    it('renders additional errors passed into it', () => {
        let errors;

        errors = TestUtils.renderIntoDocument(<Errors />);
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(0);

        errors = TestUtils.renderIntoDocument(<Errors additionalErrors={[]} />);
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(0);

        errors = TestUtils.renderIntoDocument(<Errors additionalErrors={['one', 'one', 'two']} />);
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(3);
    });

    it('renders additional errors as well as errors passed into it', () => {
        let errors;

        errors = TestUtils.renderIntoDocument(<Errors />);
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(0);

        errors = TestUtils.renderIntoDocument(<Errors additionalErrors={[]} errors={[]} />);
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(0);

        errors = TestUtils.renderIntoDocument(<Errors additionalErrors={['one']} errors={['two']} />);
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(2);
    });

    it('transforms errors thru a callback', () => {
        let errors;
        const renderer = error => <article>{error}</article>;

        errors = TestUtils.renderIntoDocument(<Errors renderError={renderer} />);
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'article').length).toBe(0);

        errors = TestUtils.renderIntoDocument(<Errors renderError={renderer} errors={['one']} />);
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'article').length).toBe(1);

        errors = TestUtils.renderIntoDocument(<Errors renderError={renderer} additionalErrors={['one']} />);
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'article').length).toBe(1);

        errors = TestUtils.renderIntoDocument(
            <Errors renderError={renderer}
                    additionalErrors={['one']}
                    errors={['two']} />
        );
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'article').length).toBe(2);
    });

    it('ignores errors when scoped is true', () => {
        let errors;

        errors = TestUtils.renderIntoDocument(<Errors errors={['one']} scoped />);
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(0);

        errors = TestUtils.renderIntoDocument(
            <Errors errors={['one']}
                    additionalErrors={['two']}
                    scoped />
        );
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(1);

        errors = TestUtils.renderIntoDocument(<Errors errors={['one']} />);
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(1);
    });

    it('flattens down fieldErrors when it is an object', () => {
        let errors;

        errors = TestUtils.renderIntoDocument(
            <Errors fieldErrors={{ name: ['one'] }} />
        );
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(0);

        errors = TestUtils.renderIntoDocument(
            <Errors fieldErrors={{ name: ['one'] }} scoped />
        );
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(1);
    });

    it('flattens down fieldErrors when it is an array', () => {
        let errors;

        errors = TestUtils.renderIntoDocument(
            <Errors fieldErrors={['one']} />
        );
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(0);

        errors = TestUtils.renderIntoDocument(
            <Errors fieldErrors={['one']} scoped />
        );
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(1);

        errors = TestUtils.renderIntoDocument(
            <Errors fieldErrors={[['one'], ['two', 'three']]} scoped />
        );
        expect(TestUtils.scryRenderedDOMComponentsWithTag(errors, 'li').length).toBe(3);
    });
});
