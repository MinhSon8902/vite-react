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

function LoginForm(props) {
  const schema = yup.object({
    identifier: yup
      .string()
      .required('Please enter your email.')
      .email('Please enter a valid email address.'),
    password: yup.string().required('Please enter your password.'),
  });
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
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
        Sign in
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <Button
          disabled={isSubmitting}
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
        >
          Sign In
        </Button>
      </form>
    </ThemeProvider>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginForm;
