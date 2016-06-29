import values from '../helpers/values';
import mapObj from '../helpers/mapObj';
import GenericObject from '../types/genericObject';

export type Tree<T> = TLeaf<T> | TArray<T> | TObject<T>;
type ChildrenArray<T> = Tree<T>[];
type ChildrenObject<T> = GenericObject<Tree<T>>

export class TLeaf<T> {
    private value: T;

    /* tslint:disable: no-any */
    public static of(value: any): TLeaf<any> {
        return new TLeaf(value);
    }
    /* tslint:enable: no-any */

    constructor(value: T) {
        this.value = value;
    }

    public of(value: T): TLeaf<T> {
        return new TLeaf(value);
    }

    public extract(): T {
        return this.value;
    }

    public map<U>(fn: (value: T) => U): Tree<U> {
        return TLeaf.of(fn(this.value));
    }

    public extend<U>(fn: (tree: Tree<T>) => U): TLeaf<U> {
        return TLeaf.of(fn(this));
    }

    public reduce<U>(fn: (previousValue: U, currentValue: T) => U, acc: U): U {
        return fn(acc, this.value);
    }
}

export class TArray<T> {
    private value: T;
    private children: ChildrenArray<T>;

    /* tslint:disable: no-any */
    public static of(value: any, children: Tree<any>[]): TArray<any> {
        return new TArray(value, children);
    }
    /* tslint:enable: no-any */

    constructor(value: T, children: ChildrenArray<T>) {
        this.value = value;
        this.children = children;
    }

    public of(value: T, children: ChildrenArray<T>): TArray<T> {
        return new TArray(value, children);
    }

    /* tslint:disable: no-any */
    public extract(): any[] {
        return this.children.map(child => child.extract());
    }
    /* tslint:enable: no-any */

    public map<U>(fn: (value: T) => U): Tree<U> {
        const nextChildren = this.children.map(child => {
            return child.map(fn);
        });

        return TArray.of(fn(this.value), nextChildren);
    }

    public extend<U>(fn: (tree: Tree<T>) => U): Tree<U> {
        const nextChildren = this.children.map(child => {
            return child.extend(fn);
        });

        return TArray.of(fn(this), nextChildren);
    }

    public reduce<U>(fn: (previousValue: U, currentValue: T) => U, acc: U): U {
        return this.children.reduce((memo, tree) => {
            return tree.reduce(fn, memo);
        }, fn(acc, this.value));
    }
}

export class TObject<T> {
    private value: T;
    private children: ChildrenObject<T>;

    /* tslint:disable: no-any */
    public static of(value: any, children: ChildrenObject<any>): TObject<any> {
        return new TObject(value, children);
    }
    /* tslint:enable: no-any */

    constructor(value: T, children: ChildrenObject<T>) {
        this.value = value;
        this.children = children;
    }

    public of(value: T, children: ChildrenObject<T>): TObject<T> {
        return new TObject(value, children);
    }

    /* tslint:disable: no-any */
    public extract(): GenericObject<any> {
        return mapObj((child) => child.extract(), this.children);
    }
    /* tslint:enable: no-any */

    public map<U>(fn: (value: T) => U): Tree<U> {
        const nextChildren = mapObj(child => child.map(fn), this.children);

        return TObject.of(fn(this.value), nextChildren);
    }

    public extend<U>(fn: (tree: Tree<T>) => U): Tree<U> {
        const nextChildren = mapObj(child => child.extend(fn), this.children);

        return TObject.of(fn(this), nextChildren);
    }

    public reduce<U>(fn: (previousValue: U, currentValue: T) => U, acc: U): U {
        return values(this.children).reduce((memo, tree) => {
            return tree.reduce(fn, memo);
        }, fn(acc, this.value));
    }
}
