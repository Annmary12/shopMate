import * as Yup from 'yup';

const email = Yup.string()
  .email('invalid email address')
  .required('email is required!');
const password = Yup.string()
  .matches(/[a-z]/, 'must contain lowercase')
  .matches(/[A-Z]/, 'must contain uppercase')
  .matches(/[0-9]/, 'must contain number')
  .min(6, 'must contain at least 6 characters')
  .required('password is required!');

/**
 * Validates SignUp form
 * @returns {void}
 */
export const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('name is required!'),
  email,
  password
})

/**
 * Validates Login  form
 * @returns {void}
 */
export const LoginSchema = Yup.object().shape({
  email,
  // password
})
