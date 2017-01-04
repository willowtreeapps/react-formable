// TODO: For the life of me I can't figure out how to import this module.
// This is a temporary hack with inlined typeings to get it workign
declare var require: any

interface Cancelable {
    cancel(): void;
    flush(): void;
}

interface DebounceSettings {
    leading?: boolean;
    maxWait?: number;
    trailing?: boolean;
}

const debounce: (<T extends Function>(func: T, wait?: number, options?: DebounceSettings) => T & Cancelable) = require('lodash.debounce')

export default debounce
