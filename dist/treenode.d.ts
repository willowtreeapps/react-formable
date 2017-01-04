import { EventType } from './validation';
export declare type Validator = (value: any, fieldValues: any, eventType: EventType) => any;
export declare type TreeNode = {
    path: string;
    name: string;
    key?: string | number;
    value?: any;
    validators: Validator[];
    fieldErrors: any[];
};
