import * as React from 'react'

export interface Props extends React.HTMLProps<HTMLInputElement> {
    validators: ((value: any, fieldValues: any) => any)[]
}

export const Input = ({ validators, ...props }: Props) =>
    <input {...props} />

export default Input
