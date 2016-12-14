import React from 'react'
import Form from '../../Form'
import './index.css'

export default props =>
    <Form {...props}>
        <input name="name" placeholder="Name" />
        <input name="age" placeholder="Age" />
        <input name="location" placeholder="Location" />

        <button type="reset">Clear</button>
        <button type="submit">Submit</button>
    </Form>
