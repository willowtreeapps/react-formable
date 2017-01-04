import { TreeNode } from './treenode';
export declare type EventType = 'onChange' | 'onSubmit' | 'serialize';
export declare const validate: (tree: TreeNode[], form: any, eventType: EventType, paths: string[]) => Promise<{
    validatedTree: TreeNode[];
    errors: any[];
    valid: boolean;
    fieldErrors: {};
}>;
