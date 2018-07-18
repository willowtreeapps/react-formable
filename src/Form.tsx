import * as React from 'react'
import { TreeNode } from './treenode'
import inflateTree from './inflateTree'
import clone from './clone'
import { EventType, validate } from './validation'
import debounce from './debounce'

export type FieldValues = any
export type FieldErrors = any
export type Error = any

export interface Validation {
  errors: Error[]
  fieldErrors: FieldErrors
  valid: boolean
}

export type FieldErrorsToProps = (fieldErrors: any[], props: any) => any

export interface ConfigureFormRes {
  eventName: string
  getValueFromEvent: (...args: any[]) => any
  defaultProp: string
  valueProp: string
  fieldErrorsToProps?: FieldErrorsToProps
}

export type ConfigureForm = (
  childType: any,
  childProps: any
) => ConfigureFormRes | undefined

export interface InternalProps {
  action: string
  method: string
  id: string
  className: string
  onChange: (fieldValues: FieldValues, validation?: Validation) => void
  onSubmit: (fieldValues: FieldValues, validation: Validation) => void
  /**
   * @property propName
   * The form scans all its children for this property. Any component found with
   * this as a prop will be tracked by the form.
   */
  propName: string
  /**
   * @property showErrorsOnChange
   * Tells the form if it should display errors via the `<Errors />` component
   * when the form is changed or not. When not provided, errors will only show
   * when the form is submitted.
   *
   * field -> Errors are only shown for fields that have changed
   * form -> Errors are shown for the entier form
   */
  showErrorsOnChange: 'field' | 'form'
  /**
   * @property showErrorsOnSubmit
   * Tells the form if it should display errors via the `<Errors />` component
   * when the form is changed or not. When not provided, errors will only show
   * when the form is submitted.
   *
   * true -> (DEFAULT) All errors are shown when the form is submitted
   * false -> No errors are shown when the form is submitted
   */
  showErrorsOnSubmit: boolean
  /**
   * @property fieldErrorsToProps
   * A global handler for passing error states to fields. This is also
   * present as an option in `configureForm` which lets you configure
   * how individual inputs get passed error states.
   *
   * This callback gets called with the errors for a Component along with
   * that components props. Whatever is returned is merged into the props
   * of the component
   */
  fieldErrorsToProps: FieldErrorsToProps
  /**
   * @property debounceValidation
   * When present, the form will wait this many millisecond before the validation
   * for `onChange` is fired. This will not change the behavior of `onSubmit`
   */
  debounceValidation: number
  /**
   * @property configureForm
   * Allows the caller to configure the form to serialize custom inputs.
   * By default it works with standard HTML form components:
   * input, radio, checkbox, textarea.
   */
  configureForm: ConfigureForm
  /**
   * @property removeValidators
   * React will warn if we pass excess properties to components. Forms will optionally
   * remove all validators from its tracked components
   *
   * true -> Removes validators
   * false -> (DEFAULT) leaves validators untouched
   */
  removeValidators: boolean
  /**
   * @property removePropName
   * React will warn if we pass excess properties to components. Forms will optionally
   * remove whatever property it looks for when looking for fields to avoid this.
   * true -> Removes property (`name` by default)
   * false -> (DEFAULT) leaves property untouched
   */
  removePropName: boolean
  /**
   * @property noValidate
   * true -> onSubmit will get call regardless of validation
   * false -> (DEFAULT) onSubmit will get called only when form is valid
   */
  noValidate: boolean
}

export type Props = Partial<InternalProps>

export interface State {
  errors: Error[]
}

export const defaultFieldErrorsToProps: FieldErrorsToProps = (
  fieldErrors,
  props
) => ({
  className: `${fieldErrors.length ? 'error' : ''} ${props.className}`,
})

export const defaultConfigureInput: ConfigureFormRes = {
  eventName: 'onChange',
  getValueFromEvent: e => e.target.value,
  defaultProp: 'defaultValue',
  valueProp: 'value',
}

const defaultConfigureCheckbox: ConfigureFormRes = {
  eventName: 'onChange',
  getValueFromEvent: e => e.target.checked,
  defaultProp: 'defaultChecked',
  valueProp: 'checked',
}

const defaultConfigureUpload: ConfigureFormRes = {
  eventName: 'onChange',
  getValueFromEvent: e => e.target.files,
  defaultProp: 'defaultValue',
  valueProp: 'value',
}

export class Form extends React.Component<Props, State> {
  static defaultProps: Props = {
    propName: 'name',
    showErrorsOnSubmit: true,
    debounceValidation: 0,
    removePropName: false,
    fieldErrorsToProps: defaultFieldErrorsToProps,
    removeValidators: true,
    noValidate: false,
    configureForm: (type, props) =>
      type === 'input' && (props.type === 'radio' || props.type === 'checkbox')
        ? defaultConfigureCheckbox
        : type === 'input' && props.type === 'file'
          ? defaultConfigureUpload
          : defaultConfigureInput,
  }

  public state = { errors: [] }
  private form: HTMLFormElement | null = null
  private dirtyNodes: string[] = []
  private tree: TreeNode[] = []

  private clear = () => {
    this.tree = []
    this.dirtyNodes = []
    this.setState({ errors: [] })

    if (this.props.onChange) this.props.onChange({})
  }

  public reset() {
    if (this.form) {
      this.form.reset()
    }
  }

  public clearFieldErrors = () => {
    this.dirtyNodes = []
    this.tree = this.tree.map(node => ({ ...node, fieldErrors: [] }))
    this.setState({ errors: [] })
  }

  public showFieldErrors = () => {
    this.serialize().validation.then(({ validatedTree, errors }) => {
      this.tree = validatedTree
      this.setState({ errors })
    })
  }

  // Only really ment for the outside world if they are doing some complex form stuff
  public serialize = () => {
    const paths = this.tree.map(node => node.path.join('.'))
    const fieldValues = inflateTree('value', this.tree)
    const validation = validate(this.tree, fieldValues, 'serialize', paths)

    return { fieldValues, validation }
  }

  private validate = debounce(
    (
      fieldValues: any,
      eventType: EventType,
      cb: (options: Validation) => void
    ) => {
      const paths =
        eventType === 'onChange' && this.props.showErrorsOnChange === 'field'
          ? this.dirtyNodes
          : this.tree.map(node => node.path.join('.'))

      this.dirtyNodes = []

      return validate(this.tree, fieldValues, eventType, paths).then(
        ({ validatedTree, errors, fieldErrors, valid }) => {
          this.tree = validatedTree
          cb({ errors, fieldErrors, valid })
        }
      )
    },
    this.props.debounceValidation
  )

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
    if (this.props.onChange) this.props.onChange(fieldValues)

    this.validate(fieldValues, 'onChange', validation => {
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

    this.validate(fieldValues, 'onSubmit', validation => {
      if (this.props.showErrorsOnSubmit)
        this.setState({ errors: validation.errors })

      if (this.props.onSubmit && (validation.valid || this.props.noValidate))
        this.props.onSubmit(fieldValues, validation)
    })

    // Immediately execute submit validation
    this.validate.flush()
  }

  render() {
    let {
      removePropName,
      removeValidators,
      onChange,
      onSubmit,
      showErrorsOnChange,
      fieldErrorsToProps,
      showErrorsOnSubmit,
      debounceValidation,
      propName,
      configureForm,
      ...props
    } = this.props as InternalProps

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

    return (
      <form
        {...props}
        ref={e => (this.form = e)}
        onSubmit={this.onSubmit}
        onChange={() => {}}
        onReset={this.clear}
        noValidate>
        {children}
      </form>
    )
  }
}

export default Form
