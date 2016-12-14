// @flow

import React, { Component } from 'react'
import inflateTree from './inflateTree'
import clone from './clone'
import debounce from 'lodash.debounce'

/*
===============================
=            TODO             =
===============================
- Get dynamic keys to persist error states
- Add prop to validate single vs form (only for onChange)
- Add optimizations for validation / serialization
- Add dynamic props passed down to components (so we can emulate redux-forms and make things controlled)
- Figure out how to pass down loading states
- Add validation to all named elements
- Make config take an array of options, that way the form can track multiple types of inputs. Perhaps also add in a an optional clone rule for each type.
- Controlled components... Figure out the appropriate order for getting values. onChange needs to have the event value, otherwise it will never get updated.
- Tests clone in isolation
- Readme with all documentation in place
- Add in propTypes
- have a mode for on change of individual input show validation

- Pass name to find, concat keys together
- Examples
    - Custom validation (eg: hints onChange and errors onSubmit, coupled with animated error states)
    - Custom inputs, maybe a datepicker, checkboxes, radio, pin input
*/

const promiseEvery = (arr) =>
    Promise.all(arr.map(val => Promise.resolve(val).catch(x => x)));

const getValueFromNode = ({ getValue, value, defaultValue }) =>
    getValue() !== undefined
        ? getValue()
        : value !== undefined
            ? value
            : defaultValue

export default class Form extends Component {
    // propName: string
    // eventName: string
    // getValueFromEvent: (e: any) => any
    // fieldErrorsToProps: (fieldErrors, props) => ({
    //     className: `${fieldErrors.length ? 'error' : ''} ${props.className}`
    // }),
    // (fieldErrors: any[], props: any) => {}
    // showErrorsOnChange: boolean
    // showErrorsOnSubmit: boolean
    // onChange: (form: IForm) => void
    // onSubmit: (form: IForm, valid: boolean) => void
    // onValidating
    // debounceValidation: number

    static defaultProps = {
        propName: 'name',
        eventName: 'onChange',
        getValueFromEvent: e => e.target.value,
        fieldErrorsToProps: (fieldErrors, props) => ({
            className: `${fieldErrors.length ? 'error' : ''} ${props.className}`
        }),
        showErrorsOnChange: false,
        showErrorsOnSubmit: true,
        debounceValidation: 0
    }

    tree = []
    state = { errors: [] }

    clearFieldErrors = () => {
        this.tree = this.tree.map(node => ({ ...node, fieldErrors: [] }))
        this.setState({ errors: [] })
    }

    showFieldErrors = () => {
        this.serialize().validation.then(({ validatedTree, errors }) => {
            this.tree = validatedTree
            this.setState({ errors })
        })
    }

    serialize = () => {
        const tempTree = this.tree.map(node => ({
            ...node,
            flattenedValue: getValueFromNode(node) || ''
        }))

        const fieldValues = inflateTree('flattenedValue', tempTree)
        const validation = this.validate(fieldValues, tempTree, 'serialize')

        return { fieldValues, validation }
    }

    validate = (form: any, tree: any, eventType : string ='') => {
        const treePromises = tree.map(node =>
            promiseEvery(node.validators.map(fn => fn(node.flattenedValue, form, eventType)))
                .then(errors => ({ ...node, fieldErrors: errors.filter(x => x) }))
        )

        return promiseEvery(treePromises).then(validatedTree => {
            const errors = validatedTree
                .reduce((memo, node) => memo.concat(node.fieldErrors), [])
                .filter((val, i, self) => self.indexOf(val) === i)

            return {
                validatedTree,
                errors,
                valid: errors.length,
                fieldErrors: inflateTree('fieldErrors', tree),
            }
        })
    }

    validateDebounced = debounce(function (...args) {
        this.validate(...args).then(({ validatedTree, errors }) => {
            this.tree = validatedTree
            this.setState({ errors })
        })
    }, this.props.debounceValidation)

    update = (e: SyntheticEvent, cb: any, showErrors: any, eventType: any) => {
        e && e.preventDefault()

        // Flatten down the existing values (since before they were callbacks)
        this.tree = this.tree.map(node => ({
            ...node,
            flattenedValue: getValueFromNode(node) || ''
        }))

        let form
        if (cb || showErrors) {
            form = inflateTree('flattenedValue', this.tree)

            cb && cb(form)
            showErrors && this.validateDebounced(form, this.tree, eventType)
        }
    }

    onChange = (e: SyntheticEvent) => this.update(e, this.props.onChange, this.props.showErrorsOnChange, 'onChange')
    onSubmit = (e: SyntheticEvent) => this.update(e, this.props.onSubmit, this.props.showErrorsOnSubmit, 'onSubmit')
    onKeyDown = (e: SyntheticKeyboardEvent) => e.key === 'Enter' && this.onSubmit(e)

    render() {
        const { propName, eventName, getValueFromEvent, fieldErrorsToProps, ...props} = this.props;
        const { children, tree } = clone({
            children: this.props.children,
            path: '',
            tree: [],
            nodeIndexCount: {},
            propName,
            eventName,
            getValueFromEvent,
            onChange: this.onChange,
            fieldErrorsToProps,
            previousRenderTree: this.tree || [],
            errors: this.state.errors
        })

        delete props.onChange
        delete props.onSubmit
        delete props.showErrorsOnChange
        delete props.showErrorsOnSubmit
        delete props.debounceValidation

        this.tree = tree

        return <form className={this.props.className}
                     onSubmit={this.onSubmit}
                     onChange={function () {}}
                     onReset={() => {
                         this.tree = []
                         this.setState({ errors: [] })
                         this.props.onChange && this.props.onChange({})
                     }}
                     onKeyDown={this.onKeyDown}
                     {...props}>
            {children}
        </form>
    }
}
