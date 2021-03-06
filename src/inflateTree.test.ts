import inflateTree from './inflateTree'

it('inflates a basic tree', () => {
  expect(
    inflateTree('value', [
      { path: ['name'], value: 'name' },
      { path: ['value'], value: 'value' },
    ])
  ).toEqual({
    name: 'name',
    value: 'value',
  })
})

it('inflates a basic nested tree', () => {
  expect(
    inflateTree('value', [
      { path: ['name'], value: 'name' },
      { path: ['value'], value: 'value' },
      { path: ['meta', 'one'], value: 'one' },
    ])
  ).toEqual({
    name: 'name',
    value: 'value',
    meta: {
      one: 'one',
    },
  })
})

it('inflates an array', () => {
  expect(
    inflateTree('value', [
      { path: ['name'], value: '0' },
      { path: ['name', '[1]'], value: '1' },
      { path: ['name', '[2]'], value: '2' },
    ])
  ).toEqual({
    name: ['0', '1', '2'],
  })
})

it('inflates a nested array', () => {
  expect(
    inflateTree('value', [
      { path: ['name', 'test'], value: '0' },
      { path: ['name', 'test', '[1]'], value: '1' },
      { path: ['name', 'test', '[2]'], value: '2' },
    ])
  ).toEqual({
    name: {
      test: ['0', '1', '2'],
    },
  })
})

it('inflates crazy tree 1', () => {
  expect(
    inflateTree('value', [
      { path: ['people', 'name'], value: 'name 0' },
      { path: ['people', 'age'], value: 'age 0' },
      { path: ['people', 'color'], value: 'color 0' },

      { path: ['people', '[1]', 'name'], value: 'name 1' },
      { path: ['people', '[1]', 'age'], value: 'age 1' },
      { path: ['people', '[1]', 'color'], value: 'color 1' },

      { path: ['people', '[2]', 'name'], value: 'name 2' },
      { path: ['people', '[2]', 'age'], value: 'age 2' },
      { path: ['people', '[2]', 'color'], value: 'color 2' },
    ])
  ).toEqual({
    people: [
      { name: 'name 0', age: 'age 0', color: 'color 0' },
      { name: 'name 1', age: 'age 1', color: 'color 1' },
      { name: 'name 2', age: 'age 2', color: 'color 2' },
    ],
  })
})

it('inflates crazy tree 2', () => {
  expect(
    inflateTree('value', [
      { path: ['people', 'name'], value: 'name 0' },
      { path: ['people', '[1]', 'name'], value: 'name 1' },
      { path: ['people', '[2]', 'test', 'another'], value: '1' },
    ])
  ).toEqual({
    people: [
      { name: 'name 0' },
      { name: 'name 1' },
      { test: { another: '1' } },
    ],
  })
})

it('inflates crazy tree 3', () => {
  expect(
    inflateTree('value', [
      { path: ['people', 'name'], value: 'name 0' },
      { path: ['people', '[1]', 'name'], value: 'name 1' },
      { path: ['people', '[2]', 'test', 'another'], value: '1' },
      { path: ['people', '[2]', 'test', 'people'], value: '0' },
      { path: ['people', '[2]', 'test', 'people', '[1]'], value: '1' },
      { path: ['people', '[2]', 'test', 'people', '[2]'], value: '2' },
      {
        path: ['people', '[2]', 'test', 'people', '[3]', 'test'],
        value: 'test',
      },
      { path: ['people', '[3]'], value: 'last' },
    ])
  ).toEqual({
    people: [
      { name: 'name 0' },
      { name: 'name 1' },
      {
        test: {
          another: '1',
          people: ['0', '1', '2', { test: 'test' }],
        },
      },
      'last',
    ],
  })
})

it('inflates an odd bug with nested arrays', () => {
  expect(
    inflateTree('fieldErrors', [
      {
        value: '',
        fieldErrors: [],
        path: ['username'],
        name: 'username',
      },
      {
        value: '',
        fieldErrors: [],
        path: ['username', '[1]'],
        name: 'username',
      },
      {
        value: '',
        fieldErrors: [],
        path: ['username', '[2]'],
        name: 'username',
      },
    ])
  ).toEqual({
    username: [[], [], []],
  })
})
