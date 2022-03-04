import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ButtonForm } from "../../../components/button";
import { AuthenticationForm } from "../../../components/form";
import { TextFieldCustom } from "../../../components/form/input";
import { CustomLink, LinkBox } from "../../../components/form/links";
import { useAuth } from "../../../hooks/context/AuthProvider";

interface Props { }
interface LoginForm {
  email: string;
  password: string;
}

let rendered = 0;

function LoginPage() {
  rendered++;
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const { handleSubmit, control, formState: { errors } } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<LoginForm> = data => {
    console.log(data);
    signIn(data.email, data.password)?.then(res => {
      localStorage.setItem('token', res.user.refreshToken);
      navigate('/dashboard', { replace: false });
    }).catch(err => {
      console.log(err)
    })
  };

  return (
    <>
      <AuthenticationForm onSubmit={handleSubmit(onSubmit)}>
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
          Login
        </ButtonForm>
      </AuthenticationForm>
      <LinkBox>
        You don't have Account? <CustomLink to="register"> Sign Up </CustomLink>
      </LinkBox>
    </>
  );
}

export default LoginPage;
