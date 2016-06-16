import { assert } from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import * as TestUtils from 'react-addons-test-utils';
import Formable from './root';

describe('Formable tests', () => {
    it('should have a span with the correct text', () => {
        const div = document.createElement('div');

        ReactDOM.render(<Formable projectName="react-formable" />, div);

        assert.equal(div.textContent, 'Hello react-formable');
    });
});
