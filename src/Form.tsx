import * as React from 'react'
import { TreeNode } from './treenode'
import inflateTree from './inflateTree'
import clone from './clone'
import { EventType, validate } from './validation'
import debounce from './debounce'

export type ConfigureFormRes = {
    eventName: string,
    getValueFromEvent: (...args: any[]) => any,
    defaultProp: string,
    valueProp: string,
    fieldErrorsToProps?: (fieldErrors: any[], props: any) => any
}

export type ConfigureForm = (childType: any, childProps: any) => ConfigureFormRes | undefined

export interface Props {
    className: string,
    propName: string,
    showErrorsOnChange: 'field' | 'form',
    showErrorsOnSubmit: boolean,
    onChange: (fieldValues: any, validation?: any) => void,
    onSubmit: (fieldValues: any, validation: any) => void,
    fieldErrorsToProps: (fieldErrors: any[], props: any) => any,
    debounceValidation: number,
    configureForm: ConfigureForm,
    removeValidators: boolean,
    removePropName: boolean,
    // noValidate
    // true -> onSubmit will get call regardless of validation
    // false -> (DEFAULT) onSubmit will get called only when form is valid
    noValidate: boolean

}

export interface State {
    errors: any[]
}

export const defaultFieldErrorsToProps = (fieldErrors: any[], props: any) => ({
    className: `${fieldErrors.length ? 'error' : ''} ${props.className}`
})

export const defaultConfigureInput: ConfigureFormRes = {
    eventName: 'onChange',
    getValueFromEvent: (e: any) => e.target.value,
    defaultProp: 'defaultValue',
    valueProp: 'value'
}

const defaultConfigureCheckbox: ConfigureFormRes = {
    eventName: 'onChange',
    getValueFromEvent: (e: any) => e.target.checked,
    defaultProp: 'defaultChecked',
    valueProp: 'checked'
}

const defaultConfigureUpload: ConfigureFormRes = {
    eventName: 'onChange',
    getValueFromEvent: (e: any) => e.target.files,
    defaultProp: 'defaultValue',
    valueProp: 'value'
}

class _Form extends React.Component<Props, State> {
    static defaultProps: Partial<Props> = {
        propName: 'name',
        showErrorsOnSubmit: true,
        debounceValidation: 0,
        removePropName: false,
        fieldErrorsToProps: defaultFieldErrorsToProps,
        removeValidators: true,
        noValidate: false,
        configureForm: (type, props) =>
            type === 'input' && (props.type === 'radio' || props.type === 'checkbox') ? defaultConfigureCheckbox :
            type === 'input' && props.type === 'file'                                 ? defaultConfigureUpload :
                                                                                        defaultConfigureInput
    }

    public state = { errors: [] }
    private dirtyNodes: string[] = []
    private tree: TreeNode[] = []

    private clear = () => {
        this.tree = []
        this.dirtyNodes = []
        this.setState({ errors: [] })

        if(this.props.onChange)
            this.props.onChange({})
    }

    public clearFieldErrors = () => {
        this.dirtyNodes = []
        this.tree = this.tree.map(node => ({ ...node, fieldErrors: [] }))
        this.setState({ errors: [] })
    }

    public showFieldErrors = () => {
        // this.serialize().validation.then(({ validatedTree, errors }) => {
        //     this.tree = validatedTree
        //     this.setState({ errors })
        // })
    }

    // Only really ment for the outside world if they are doing some complex form stuff
    public serialize = () => {
        const paths = this.tree.map(node => node.path.join('.'))
        const fieldValues = inflateTree('value', this.tree)
        const validation = validate(this.tree, fieldValues, 'serialize', paths)

        return { fieldValues, validation }
    }

    private validate = debounce((fieldValues: any, eventType: EventType, cb: (options: { errors: any[], fieldErrors: any, valid: boolean }) => void) => {
        const paths = (eventType === 'onChange' && this.props.showErrorsOnChange === 'field')
            ? this.dirtyNodes
            : this.tree.map(node => node.path.join('.'))

        this.dirtyNodes = []

        return validate(this.tree, fieldValues, eventType, paths).then(({ validatedTree, errors, fieldErrors, valid }) => {
            this.tree = validatedTree
            cb({ errors, fieldErrors, valid })
        })
    }, this.props.debounceValidation)

    private onChange = (path: string[], value: any) => {
        this.dirtyNodes.push(path.join('.'))

        this.tree = this.tree.map(node => {
            return node.path === path ? { ...node, value } : node
        })

        // No callback and we are not showing errors, no need to do any work
        if (!this.props.onChange && !this.props.showErrorsOnChange) return

        // In both cases, we need to inflate the current form object
        const fieldValues = inflateTree('value', this.tree)

        // Trigger on change immediately as to not block any potential dependencies on this data
        if (this.props.onChange)
            this.props.onChange(fieldValues)

        this.validate(fieldValues, 'onChange', (validation) => {
            if (this.props.showErrorsOnChange)
                this.setState({ errors: validation.errors })

            // After we are done validating, if the onChange asked for validation, give it to them
            // We have to call onChange twice since debounceing means we won't always have validation
            if (this.props.onChange && this.props.onChange.length !== 1) {
                this.props.onChange(inflateTree('value', this.tree), validation)
            }
        })
    }

    private onSubmit = (e: any) => {
        e.preventDefault()

        // No one is expecting work, no need to validate
        if (!this.props.onSubmit && !this.props.showErrorsOnSubmit) return

        const fieldValues = inflateTree('value', this.tree)

        // Clear old validations
        this.validate.cancel()

        this.validate(fieldValues, 'onSubmit', (validation) => {
            if (this.props.showErrorsOnSubmit)
                this.setState({ errors: validation.errors })

            if (this.props.onSubmit && (validation.valid || this.props.noValidate))
                this.props.onSubmit(fieldValues, validation)
        })

        // Immediately execute submit validation
        this.validate.flush()
    }

    render() {
        let { removePropName, removeValidators, onChange, onSubmit, showErrorsOnChange, fieldErrorsToProps, showErrorsOnSubmit, debounceValidation, propName, configureForm, ...props} = this.props
        const { children, tree } = clone({
            children: this.props.children,
            path: [],
            tree: [],
            nodeIndexCount: {},
            removeValidators,
            removePropName,
            propName,
            fieldErrorsToProps,
            configureForm,
            onChange: this.onChange,
            previousRenderTree: this.tree || [],
            errors: this.state.errors,
        })

        this.tree = tree

        return <form {...props}
                     onSubmit={this.onSubmit}
                     onChange={() => {}}
                     onReset={this.clear}
                     noValidate>
            {children}
        </form>
    }
}

export const Form: React.ComponentClass<Partial<Props>> = _Form
export default _Form as React.ComponentClass<Partial<Props>>
