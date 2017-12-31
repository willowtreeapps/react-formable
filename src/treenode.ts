import { EventType } from './validation'

export type Validator = (
  value: any,
  fieldValues: any,
  eventType: EventType
) => any

export type TreeNode = {
  path: string[]
  name?: string
  key?: string | number
  value?: any
  validators?: Validator[]
  fieldErrors?: any[]
}
