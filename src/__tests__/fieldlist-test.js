jest.dontMock('../fieldlist');
jest.dontMock('../inputs/input');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Fieldlist = require('../fieldset').default;
const Input = require('../inputs/input').default;

describe('Fieldlist', () => {
    it('write test', () => {
        expect(1).toBe(2);
    });
});
