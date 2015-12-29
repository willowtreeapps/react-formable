import React from 'react';

jest.dontMock('../cloneChildren');

import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

describe('cloneChildren', () => {
    const cloneChildren = require('../cloneChildren').default;

    describe('calls the predicate for each node in the child tree', () => {
        let predicate, getProps;

        beforeEach(() => {
            getProps = jest.genMockFunction();
            predicate = jest.genMockFunction();
        });

        it('base case', () => {
            cloneChildren(predicate, getProps, <div></div>);
            expect(predicate.mock.calls.length).toBe(1);
        });

        it('simple recursion', () => {
            cloneChildren(predicate, getProps, <div>
                <span />
                <span />
            </div>);
            expect(predicate.mock.calls.length).toBe(3);
        });

        it('more complex recursion', () => {
            cloneChildren(predicate, getProps, <div>
                <span />
                <span>
                    <span />
                    <span>
                        <span />
                    </span>
                </span>
            </div>);
            expect(predicate.mock.calls.length).toBe(6);
        });
    });

    describe('does not recursivly descend past cloned children', () => {
        let predicate, getProps;

        beforeEach(() => {
            predicate = () => true;
            getProps = jest.genMockFunction();
        });

        it('stops at the root node if the root node passes', () => {
            cloneChildren(predicate, getProps, <div>
                <span />
                <span />
            </div>);
            expect(getProps.mock.calls.length).toBe(1);
        });

        it('descendes to children', () => {
            predicate = (child) => child.type === 'span';
            getProps = jest.genMockFunction();

            cloneChildren(predicate, getProps, <div>
                <span />
                <span />
            </div>);

            expect(getProps.mock.calls.length).toBe(2);
        });

        it('descendes to nested children', () => {
            predicate = (child) => child.type === 'span';
            getProps = jest.genMockFunction();

            cloneChildren(predicate, getProps, <div>
                <span />
                <span />
                <div>
                    <span />
                    <div>
                        <span />
                    </div>
                </div>
            </div>);

            expect(getProps.mock.calls.length).toBe(4);
        });
        it('descendes to nested children and stops on nested predicates', () => {
            predicate = (child) => child.type === 'span';
            getProps = jest.genMockFunction();

            cloneChildren(predicate, getProps, <div>
                <span />
                <span />
                <div>
                    <span />
                    <div>
                        <span>
                            <span />
                            <span />
                        </span>
                    </div>
                </div>
            </div>);

            expect(getProps.mock.calls.length).toBe(4);
        });
    });

    describe('passes props to cloned children', () => {
        let getProps, predicate;

        beforeEach(() => {
            predicate = jest.genMockFunction();
            getProps = () => ({ test: true });
        });

        it('base case', () => {
            predicate = () => true;
            const children = TestUtils.renderIntoDocument(
                cloneChildren(predicate, getProps, <div></div>)
            );

            expect(children.props.test).toBe(true);
        });
    });
});
