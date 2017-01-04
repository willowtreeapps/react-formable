/// <reference types="react" />
import * as React from 'react';
export interface Props extends React.HTMLProps<HTMLInputElement> {
    validators: ((value: any, fieldValues: any) => any)[];
}
export declare const Input: ({validators, ...props}: Props) => JSX.Element;
export default Input;
