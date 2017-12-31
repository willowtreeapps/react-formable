// TODO: For the life of me I can't figure out how to import this module.
// This is a temporary hack with inlined typeings to get it working
declare var require: any

export interface Cancelable {
  cancel(): void
  flush(): void
}

export interface DebounceSettings {
  leading?: boolean
  maxWait?: number
  trailing?: boolean
}

const debounce: (<T extends Function>(
  func: T,
  wait?: number,
  options?: DebounceSettings
) => T & Cancelable) = require('lodash.debounce')

export default debounce
