// @flow

import React from 'react'

type InputProps = {
    validators: ((value: ?any, fieldValues: any) => any)[]
}

const Input = ({ validators, ...props }: InputProps) =>
    <input {...props} />

Input.propTypes = {
    validators: React.PropTypes.arrayOf(React.PropTypes.func)
}

export default Input
