import { ConfigureForm } from './Form';
import { TreeNode } from './treenode';
declare const clone: (options: {
    children: any;
    path: string;
    tree: TreeNode[];
    nodeIndexCount: {
        [key: string]: number;
    };
    propName: string;
    onChange: (path: string, value: any) => void;
    configureForm: ConfigureForm;
    previousRenderTree: TreeNode[];
    errors: any[];
    key?: string | undefined;
    removeValidators: boolean;
    removePropName: boolean;
}) => {
    children: any;
    tree: TreeNode[];
    nodeIndexCount: {
        [key: string]: number;
    };
};
export default clone;
