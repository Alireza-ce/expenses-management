import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ButtonForm } from "../../../components/button";
import { AuthenticationForm } from "../../../components/form";
import { TextFieldCustom } from "../../../components/form/input";
import { CustomLink, LinkBox } from "../../../components/form/links";
import { SecondaryTitle } from "../../../components/titles";
import { useAuth } from "../../../hooks/context/AuthProvider";
import classes from './register.module.scss';


interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const [firebaseError, setFirebaseError] = useState({ show: false, message: '' });
  const { signUp } = useAuth();

  const { handleSubmit, control, formState: { errors } } = useForm<RegisterForm>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit: SubmitHandler<RegisterForm> = data => {
    if (data.password !== data.confirmPassword) {
      setFirebaseError({ show: true, message: 'Your password and confirm password field are not the same!' })
      return
    }

    setFirebaseError({ show: false, message: '' })
    setLoadingStatus(true)
    signUp(data.email, data.password)?.then(res => {
      localStorage.setItem('token', res.user.refreshToken);
      navigate('/panel', { replace: false });
    }).catch(err => {
      setFirebaseError({ show: true, message: 'This user is exist!' })
    }).finally(() => {
      setLoadingStatus(false)
    })
  };

  return (
    <div>
      <AuthenticationForm onSubmit={handleSubmit(onSubmit)}>
        <SecondaryTitle textAlign="center">
          Register
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
          rules={{ required: true,minLength:{value:4,message:'The minimum length of password is 4!'} }}
          render={({ field }) => <TextFieldCustom {...field} error={errors.password ? true : false} label="Password" variant="outlined" type='password' />}
        />
        <Controller
          name="confirmPassword"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextFieldCustom {...field} error={errors.confirmPassword ? true : false} label="Confirm Password" variant="outlined" type='password' />}
        />
        <ButtonForm type="submit" variant="contained" color="primary">
          {isLoading ? <CircularProgress style={{ width: '24px', height: '24px', color: "white" }} /> : 'Register'}
        </ButtonForm>
        {firebaseError.show && <p className={classes.errorText}>{firebaseError.message}</p>}
        <LinkBox >
          Do you have an Account? <CustomLink to="/"> Login </CustomLink>
        </LinkBox>
      </AuthenticationForm>
    </div>
  );
}


