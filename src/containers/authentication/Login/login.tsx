
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ButtonForm } from "../../../components/button";
import { AuthenticationForm } from "../../../components/form";
import { TextFieldCustom } from "../../../components/form/input";
import { CustomLink, LinkBox } from "../../../components/form/links";
import { SecondaryTitle } from "../../../components/titles";
import { useAuth } from "../../../hooks/context/AuthProvider";
import { LoginContainer } from "./login.style";
import classes from './login.module.scss';

interface Props { }
interface LoginForm {
  email: string;
  password: string;
}


function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const { signIn } = useAuth();

  const { handleSubmit, control, formState: { errors } } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<LoginForm> = data => {
    console.log(data);
    setLoadingStatus(true)
    signIn(data.email, data.password)?.then(res => {
      localStorage.setItem('token', res.user.refreshToken);
      navigate('/dashboard', { replace: false });
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setLoadingStatus(false)
    })
  };

  return (
    <LoginContainer>
      <AuthenticationForm onSubmit={handleSubmit(onSubmit)}>
        <SecondaryTitle textAlign="center">
          Login
        </SecondaryTitle>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true, pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format"
            }
          }}
          render={({ field }) => <TextFieldCustom {...field} error={errors.email ? true : false} label="Email" variant="outlined" />}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextFieldCustom {...field} error={errors.password ? true : false} label="Password" variant="outlined" type='password' />}
        />
        <ButtonForm type="submit" variant="contained" color="primary">
          {isLoading ? <CircularProgress style={{ width: '25px', height: '25px', color: "white" }} /> : 'Login'}
        </ButtonForm>
        <LinkBox >
          You don't have Account? <CustomLink to="register"> Sign Up </CustomLink>
        </LinkBox>
      </AuthenticationForm>
    </LoginContainer>
  );
}

export default LoginPage;
