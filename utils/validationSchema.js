import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters')
    .matches(/^\w+$/, 'Username can only contain letters, numbers, and underscores'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]+$/, 'Password must contain at least one letter and one number'),
    confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'), // Check if confirmPassword matches password
});