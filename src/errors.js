// @flow

import React from 'react'

type ErrorsProps = {
    renderError: (error: any) => any,
    errors: any[],
    _errors: any[],
    className: string
}

const Errors = ({ renderError=(x => x), errors=[], _errors=[], className='' }: ErrorsProps) => {
    const allErrors = errors.concat(_errors)

    const errorLis = allErrors.reduce((memo, error, i) => {
        const el = renderError(error)
        return el ? memo.concat(<li key={error.toString() + i}>{el}</li>) : memo;
    }, [])

    return !!allErrors.length && <ul className={`${className} errors`}>{errorLis}</ul>
}

export default Errors
