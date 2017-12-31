import * as React from 'react'

export interface Props extends React.HTMLProps<HTMLUListElement> {
  renderError?: (error: any) => any
  errors?: any[]
  _errors?: any[]
  className?: string
}

export const Errors: React.SFC<Props> = ({
  renderError = (x: any) => x,
  errors = [],
  _errors = [],
  className = '',
}) => {
  const allErrors = errors.concat(_errors).filter((value, index, self) => {
    return self.indexOf(value) === index
  })

  const errorLis = allErrors.reduce((memo, error, i) => {
    const el = renderError(error)
    return el ? memo.concat(<li key={error.toString() + i}>{el}</li>) : memo
  }, [])

  return !!allErrors.length ? (
    <ul className={`${className} errors`}>{errorLis}</ul>
  ) : null
}

export default Errors
