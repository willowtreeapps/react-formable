import { validate } from './validation'

const required = (x: any) => !x && 'error'

describe('validation', () => {
  describe('Simple', () => {
    let paths: string[] = []
    let simpleTree = [
      {
        value: '',
        fieldErrors: [],
        path: ['username'],
        name: 'username',
        validators: [required],
      },
      {
        value: '',
        fieldErrors: [],
        path: ['username', '[1]'],
        name: 'username',
        validators: [required],
      },
      {
        value: '',
        fieldErrors: [],
        path: ['username', '[2]'],
        name: 'username',
        validators: [required],
      },
    ]

    beforeEach(() => {
      simpleTree = simpleTree.map(node => ({
        ...node,
        value: '',
      }))
      paths = simpleTree.map(node => node.path.join('.'))
    })

    it('must not show errors if all the validators pass', async () => {
      simpleTree[0].value = 'value'
      simpleTree[1].value = 'value'
      simpleTree[2].value = 'value'

      const val = await validate(simpleTree, {}, 'onChange', paths)

      expect(val.valid).toBeTruthy()
      expect(val.errors).toEqual([])
      expect(val.fieldErrors).toEqual({
        username: [[], [], []],
      })
    })

    it('must show errors if a validator fails', async () => {
      const val = await validate(simpleTree, {}, 'onChange', paths)

      expect(val.valid).toBeFalsy()
      expect(val.errors).toEqual(['error'])
      expect(val.fieldErrors).toEqual({
        username: [['error'], ['error'], ['error']],
      })
    })

    it('must show errors if a validator fails', async () => {
      simpleTree[1].value = 'value'
      const val = await validate(simpleTree, {}, 'onChange', paths)

      expect(val.valid).toBeFalsy()
      expect(val.errors).toEqual(['error'])
      expect(val.fieldErrors).toEqual({
        username: [['error'], [], ['error']],
      })
    })
  })
})
