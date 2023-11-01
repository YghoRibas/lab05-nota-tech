import LoginIcon from '@mui/icons-material/Login';
import * as Yup from "yup";
import { Box, Button, Typography } from "@mui/material"
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormProvider from "src/modules/@shared/providers/form-provider";
import { SchemaType } from "src/modules/@shared/domain/utils/schema-type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RTextField from "src/modules/@shared/components/form/r-text-field";
import { useState } from 'react';

export default function LoginPage() {
  const loginSchema = Yup.object({
    username: Yup
      .string()
      .required('Insira o usuario'),

    password: Yup
      .string()
      .required('Insira a senha'),
  });

  type LoginSchemaType = SchemaType<typeof loginSchema>

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const { handleSubmit, formState: { errors } } = methods

  const onSubmit = (values: LoginSchemaType) => 
    console.log({ values })

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <ShapeTopLeft />

      <AuthBanner />

      <FormProvider
        style={{ width: '560px' }}
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}>
        <LoginContent />
      </FormProvider>

      <ShapeBottomRight />
    </Box>
  )
}

export function AuthBanner() {
  return (
    <Box
      component="img"
      src="/authentication.svg"
      sx={{ width: '700px' }}
    />
  )
}

export function ShapeTopLeft() {
  const style = {
    width: '400px',
    height: '400px',
    top: '-11rem',
    left: '-6.5rem',
    background: 'linear-gradient(180deg, #12192C 0%, rgba(196,196,196,0) 100%)',
    position: 'absolute',
    borderRadius: '50%'
  }

  return (
    <Box sx={style} />
  )
}

export function ShapeBottomRight() {
  const style = {
    width: '300px',
    height: '300px',
    right: '-6.5rem',
    bottom: '-6rem',
    background: 'linear-gradient(180deg, #12192C 0%, rgba(196,196,196,0) 100%)',
    position: 'absolute',
    transform: 'rotate(180deg)',
    borderRadius: '50%'
  }

  return (
    <Box sx={style} />
  )
}

export function LoginContent() {
  const [username, setUsername] = useState(false)
  const [password, setPassword] = useState(false)

  return (
    <Box sx={{ p: '62px', pt: 0 }}>
      <Typography variant="h5" sx={{ mb: 5 }} fontWeight="300" fontSize="2.5rem">
        Bem Vindo
      </Typography>

      <RTextField
        name="username"
        label="Usuario"
        variant="filled"
        InputLabelProps={{ sx: { ml: 4.5 }, shrink: username }}
        InputProps={{
          startAdornment: (
            <AccountCircle
              sx={{
                color: 'action.active',
                position: 'relative',
                mr: 1,
                my: 0.5
              }}
            />
          )
        }}
        inputProps={{
          onFocus: () => setUsername(true),
          onBlur: (e: React.ChangeEvent<HTMLInputElement>) => setUsername(!!e.target.value)
        }}
        sx={{ mb: 5 }}
      />

      <RTextField
        name="password"
        label="Senha"
        variant="filled"
        InputLabelProps={{ sx: { ml: 4.5 }, shrink: password }}
        InputProps={{
          startAdornment: (
            <AccountCircle
              sx={{
                color: 'action.active',
                position: 'relative',
                mr: 1,
                my: 0.5
              }}
            />
          )
        }}
        inputProps={{
          onFocus: () => setPassword(true),
          onBlur: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(!!e.target.value)
        }}
      />

      <Button
        variant="outlined"
        startIcon={<LoginIcon />}
        sx={{
          color: 'white',
          background: 'black',
          height: '45px',
          width: '100%',
          mt: '45px',
          '&:hover': {
            background: 'black',
            borderColor: 'white'
          }
        }}
        type="submit">
        Fazer Login
      </Button>
    </Box>
  )
}