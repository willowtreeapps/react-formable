import React from 'react';
import Form from '../../Form';
import Input from '../../Input'
import Errors from '../../Errors'
import './index.css';

const uid = () => Math.floor(Math.random()*1000000000000000000000000000)

const setRows = ({ rows }) => {
    const id = uid()
    return Object.assign({}, rows, {
        [id]: {}
    })
}
const removeRow = ({ rows }, id) => {
    const newObj = Object.assign({}, rows)
    delete newObj[id]
    return newObj
}

const setColumn = ({ rows }, id) => {
    const cid = uid()
    return Object.assign({}, rows, {
        [id]: Object.assign({}, rows[id], {
            [cid]: true
        })
    })
}

const removeColumn = ({ rows }, id, cid) => {
    const newRows = Object.assign({}, rows)
    delete newRows[id][cid]
    return newRows
}


export default class NestedDynamicInputs extends React.Component {
    state = { rows: {} }

    render() {
        return <Form showErrorsOnChange {...this.props}>
            <div className="button add-family" onClick={() => this.setState({ rows: setRows(this.state) }) }>+ Add Family</div>

            {Object.keys(this.state.rows).map((id) =>
                <div className="family" name="family" key={id}>
                    <div className="button remove-family" onClick={() => this.setState({ rows: removeRow(this.state, id) })}>- Remove Family</div>

                    <div name="parent">
                        parent 1:
                        <Input name="name" placeholder="name" />
                        <Input name="age" placeholder="age" />
                    </div>

                    <div name="parent">
                        parent 2:
                        <Input name="name" placeholder="name" />
                        <Input name="age" placeholder="age" />
                    </div>

                    <div className="button add-child" onClick={() => this.setState({ rows: setColumn(this.state, id) }) }>+ Add Child</div>
                    {Object.keys(this.state.rows[id]).map((cid, i) =>
                        <div className="child" key={cid}>
                            <div>
                                <div className="button remove-child" onClick={() => this.setState({ rows: removeColumn(this.state, id, cid) })}>- Remove Child</div>
                                Child {i} <Input name="child" placeholder="child name" validators={[ value => value === 'bad' && "BAD BAD BAD" ]} />
                            </div>
                        </div>
                    )}
                </div>
            )}

            <button type="reset">Reset</button>
            <Errors />
        </Form>
    }
}

