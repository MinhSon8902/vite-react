import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/Input-Field';
import {
  Avatar,
  Button,
  LinearProgress,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import PasswordField from '../../../../components/form-controls/PasswordField';

function RegisterForm(props) {
  const schema = yup.object({
    fullName: yup
      .string()
      .required('Please enter your full name.')
      .test(
        'should has at least two words',
        'Please enter at least two words.',
        (value) => {
          return value.split(' ').length >= 2;
        }
      ),
    email: yup
      .string()
      .required('Please enter your email.')
      .email('Please enter a valid email address.'),
    password: yup
      .string()
      .required('Please enter your password.')
      .min(6, 'Please enter at least 6 characters'),
    retypePassword: yup
      .string()
      .required('Please retype your password.')
      .oneOf([yup.ref('password')], 'Password does not match'),
  });
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      {isSubmitting && <LinearProgress />}
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main', margin: '0 auto' }}>
        <LockOutlined />
      </Avatar>
      <Typography
        component="h1"
        variant="h5"
        sx={{ textAlign: 'center', marginBlock: '10px' }}
      >
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField
          name="retypePassword"
          label="Retype Password"
          form={form}
        />

        <Button
          disabled={isSubmitting}
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
        >
          Create an account
        </Button>
      </form>
    </ThemeProvider>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default RegisterForm;
