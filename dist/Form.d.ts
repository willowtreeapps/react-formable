/// <reference types="react" />
import * as React from 'react';
export declare type ConfigureForm = (childType: any, childProps: any) => {
    eventName: string;
    getValueFromEvent: (e: any) => any;
    defaultProp: string;
    valueProp: string;
    fieldErrorsToProps: (fieldErrors: any[], props: any) => any;
} | undefined;
export interface Props {
    className: string;
    propName: string;
    showErrorsOnChange: 'field' | 'form';
    showErrorsOnSubmit: boolean;
    onChange: (fieldValues: any, validation?: any) => void;
    onSubmit: (fieldValues: any, validation: any) => void;
    debounceValidation: number;
    configureForm: ConfigureForm;
    removeValidators: boolean;
    removePropName: boolean;
}
export interface State {
    errors: any[];
}
export declare const defaultFieldErrorsToProps: (fieldErrors: any[], props: any) => {
    className: string;
};
export declare const defaultConfigureInput: {
    eventName: string;
    getValueFromEvent: (e: any) => any;
    defaultProp: string;
    valueProp: string;
    fieldErrorsToProps: (fieldErrors: any[], props: any) => {
        className: string;
    };
};
export declare const Form: React.ComponentClass<Partial<Props>>;
declare var _default: React.ComponentClass<Partial<Props>>;
export default _default;
