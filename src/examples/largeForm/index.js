import React from 'react';
import Form from '../../Form';
import Input from '../../Input'
import Errors from '../../Errors'

const range = i => [...Array(i).keys()]

const validators = [
    value => value === 'bad' && 'Bad input value',
    value => value === 'good' && 'Good input value, but still bad!'
]

export default props =>
    <Form {...props}>
        {range(1000).map(i =>
            <div name="person" key={i}>
                <Input name="name" placeholder="name" validators={validators} />
                <Input name="age" placeholder="age" validators={validators} />
                <Input name="location" placeholder="location" validators={validators} />
            </div>
        )}

        <Errors />
    </Form>
