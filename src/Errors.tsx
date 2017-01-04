import * as React from 'react'

export interface Props extends React.HTMLProps<HTMLUListElement> {
    renderError: (error: any) => any,
    errors: any[],
    _errors: any[],
    className: string
}

export const Errors = ({ renderError=(x => x), errors=[], _errors=[], className='' }: Props) => {
    const allErrors = errors.concat(_errors)

    const errorLis = allErrors.reduce((memo, error, i) => {
        const el = renderError(error)
        return el ? memo.concat(<li key={error.toString() + i}>{el}</li>) : memo;
    }, [])

    return !!allErrors.length && <ul className={`${className} errors`}>{errorLis}</ul>
}

export default Errors
