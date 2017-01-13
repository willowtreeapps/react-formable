"use strict";
const inflateTree_1 = require("../inflateTree");
it('inflates a basic tree', () => {
    expect(inflateTree_1.default('value', [
        { path: 'name', value: 'name' },
        { path: 'value', value: 'value' },
    ])).toEqual({
        name: 'name',
        value: 'value'
    });
});
it('inflates a basic nested tree', () => {
    expect(inflateTree_1.default('value', [
        { path: 'name', value: 'name' },
        { path: 'value', value: 'value' },
        { path: 'meta.one', value: 'one' }
    ])).toEqual({
        name: 'name',
        value: 'value',
        meta: {
            one: 'one'
        }
    });
});
it('inflates an array', () => {
    expect(inflateTree_1.default('value', [
        { path: 'name', value: '0' },
        { path: 'name.[1]', value: '1' },
        { path: 'name.[2]', value: '2' },
    ])).toEqual({
        name: ['0', '1', '2'],
    });
});
it('inflates a nested array', () => {
    expect(inflateTree_1.default('value', [
        { path: 'name.test', value: '0' },
        { path: 'name.test.[1]', value: '1' },
        { path: 'name.test.[2]', value: '2' },
    ])).toEqual({
        name: {
            test: ['0', '1', '2']
        },
    });
});
it('inflates crazy tree 1', () => {
    expect(inflateTree_1.default('value', [
        { path: 'people.name', value: 'name 0' },
        { path: 'people.age', value: 'age 0' },
        { path: 'people.color', value: 'color 0' },
        { path: 'people.[1].name', value: 'name 1' },
        { path: 'people.[1].age', value: 'age 1' },
        { path: 'people.[1].color', value: 'color 1' },
        { path: 'people.[2].name', value: 'name 2' },
        { path: 'people.[2].age', value: 'age 2' },
        { path: 'people.[2].color', value: 'color 2' },
    ])).toEqual({
        people: [
            { name: 'name 0', age: 'age 0', color: 'color 0' },
            { name: 'name 1', age: 'age 1', color: 'color 1' },
            { name: 'name 2', age: 'age 2', color: 'color 2' },
        ]
    });
});
it('inflates crazy tree 2', () => {
    expect(inflateTree_1.default('value', [
        { path: 'people.name', value: 'name 0' },
        { path: 'people.[1].name', value: 'name 1' },
        { path: 'people.[2].test.another', value: '1' }
    ])).toEqual({
        people: [
            { name: 'name 0' },
            { name: 'name 1' },
            { test: { another: '1' } },
        ]
    });
});
it('inflates crazy tree 3', () => {
    expect(inflateTree_1.default('value', [
        { path: 'people.name', value: 'name 0' },
        { path: 'people.[1].name', value: 'name 1' },
        { path: 'people.[2].test.another', value: '1' },
        { path: 'people.[2].test.people', value: '0' },
        { path: 'people.[2].test.people.[1]', value: '1' },
        { path: 'people.[2].test.people.[2]', value: '2' },
        { path: 'people.[2].test.people.[3].test', value: 'test' },
        { path: 'people.[3]', value: 'last' }
    ])).toEqual({
        people: [
            { name: 'name 0' },
            { name: 'name 1' },
            {
                test: {
                    another: '1',
                    people: [
                        '0',
                        '1',
                        '2',
                        { test: 'test' }
                    ]
                }
            },
            'last'
        ]
    });
});
// it('inflates crazy tree 4', () => {
//     expect(inflateTree('value', [
//         { path: 'person.name', value: undefined, },
//         { path: 'person.age', value: undefined, },
//         { path: 'person.location', value: undefined, },
//         { path: 'person.name.[1]', value: undefined, },
//         { path: 'person.age.[1]', value: undefined, },
//         { path: 'person.location.[1]', value: undefined, },
//         { path: 'person.name.[2]', value: undefined, },
//         { path: 'person.age.[2]', value: undefined, },
//         { path: 'person.location.[2]', value: undefined, }
//     ])).toEqual({
//         person: [
//         ]
//     })
// });
// [
//     { path: 'person.name', value: undefined, },
//     { path: 'person.age', value: undefined, },
//     { path: 'person.location', value: undefined, },
//     { path: 'person.[1].name', value: undefined, },
//     { path: 'person.[1].age', value: undefined, },
//     { path: 'person.[1].location', value: undefined, },
//     { path: 'person.[1].name', value: undefined, },
//     { path: 'person.[1].age', value: undefined, },
//     { path: 'person.[1].location', value: undefined, }
// ]
// WHAT IT IS
[
    { "path": "family.parent.name", value: "bad" },
    { "path": "family.parent.[1].name", value: "bad" },
    { "path": "family.parent.[2].name", value: "bad" },
    { "path": "family.parent.[3].name", value: "bad" }
][{ "path": "family.parent.name", value: "bad" },
    { "path": "family.parent.[1].name", value: "bad" },
    { "path": "family.[1].parent.name", value: "bad" },
    { "path": "family.[1].parent.[1].name", value: "bad" }][{ "path": "family.parent.name", value: "bad" },
    { "path": "family.parent.[1].name", value: "bad" },
    { "path": "family.child", value: "bad" },
    { "path": "family.[1].child", value: "bad" },
    { "path": "family.parent.[2].name", value: "bad" },
    { "path": "family.parent.[3].name", value: "bad" },
    { "path": "family.[2].child", value: "bad" },
    { "path": "family.[3].child", value: "bad" }][{ "path": "family.parent.name", value: "bad" },
    { "path": "family.parent.[1].name", value: "bad" },
    { "path": "family.child.name", value: "bad" },
    { "path": "family.child.[1].name", value: "bad" },
    { "path": "family.[1].parent.name", value: "bad" },
    { "path": "family.[1].parent.[1].name", value: "bad" },
    { "path": "family.[1].child.name", value: "bad" },
    { "path": "family.[1].child.[1].name", value: "bad" }];
//# sourceMappingURL=inflateTree.test.js.map