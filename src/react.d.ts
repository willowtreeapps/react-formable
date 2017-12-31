import { HTMLAttributes } from 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    name?: any
  }
}
