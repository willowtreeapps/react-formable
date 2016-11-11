// Components
import Form, { getBlankForm, IForm } from './form';
import Fieldset from './fieldset';
import Fieldlist from './fieldlist';
import Input from './inputs/input';
import Errors from './errors';
import normalizeInput from './normalizeInput';

// Validators
import required from './validators/required';
import greaterThan from './validators/greaterThan';
import lessThan from './validators/lessThan';
import maxLength from './validators/maxLength';
import minLength from './validators/minLength';
import test from './validators/test';
import equalsField from './validators/equalsField';
const validators = { required, greaterThan, lessThan, maxLength, minLength, test, equalsField };

export { Form, getBlankForm, Fieldset, Fieldlist, Input, Errors, validators, IForm, normalizeInput };
export default Form;
