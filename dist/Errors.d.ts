/// <reference types="react" />
import * as React from 'react';
export interface Props extends React.HTMLProps<HTMLUListElement> {
    renderError: (error: any) => any;
    errors: any[];
    _errors: any[];
    className: string;
}
export declare const Errors: ({renderError, errors, _errors, className}: Props) => false | JSX.Element;
export default Errors;
