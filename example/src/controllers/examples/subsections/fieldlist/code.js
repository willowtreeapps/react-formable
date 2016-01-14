/* eslint func-style:0 */
import React, { PropTypes } from 'react';
import { Form, Input, Errors, Fieldlist } from 'react-formable';
const { required } = require('react-formable').validators;

const FieldlistForm = React.createClass({

    propTypes: {
        onChange: PropTypes.func
    },

    getInitialState() {
        return {
            uniqueTagId: 0,
            pets: []
        };
    },

    abandonPet(tagId) {
        const pets = this.state.pets.slice().filter((petId) =>
            tagId !== petId);

        this.setState({ pets }, () => this.refs.form.onChange());
    },

    adoptPet() {
        const tagId = this.state.uniqueTagId;
        const pets = this.state.pets.slice();

        pets.push(tagId);
        this.setState({ pets, uniqueTagId: tagId + 1 }, () =>
            this.refs.form.onChange());
    },

    render() {
        const petInputs = this.state.pets.map((tagId) =>
            <div key={`key-${tagId}`}>
                <label>Pet Name *
                    <Input name="name"
                           type="text"
                           validators={[
                               required('You must name your pet!')
                           ]} />
                    <span className="a"
                          onClick={() => this.abandonPet(tagId)}>Abandon</span>
                </label>
            </div>);

        return <Form ref="form" onChange={this.props.onChange}>
                <Errors className="formErrors" />
                <Input type="button"
                       value="Adopt Pet"
                       onClick={this.adoptPet} />
                <Fieldlist name="pets">{petInputs}</Fieldlist>
                <input type="submit" value="Submit" />
        </Form>;
    }
});

export default FieldlistForm;
export const source = require('fs').readFileSync(__filename, 'utf8');
