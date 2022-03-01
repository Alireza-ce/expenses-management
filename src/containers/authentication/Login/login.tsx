import React from "react";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ButtonForm } from "../../../components/button";
import { TextFieldCustom } from "../../../components/form/input";

interface Props { }
interface LoginForm {
  email: string;
  password: string;
}

let rendered = 0;

function LoginPage() {
  rendered++;

  const { handleSubmit, control, formState: { errors } } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const onSubmit: SubmitHandler<LoginForm> = data => console.log(data);

  return (
    <>
      <p>
        login page  { rendered }
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <p>{errors.email && "email is not correct"}</p>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextFieldCustom {...field} error={errors.password ? true : false} label="Password" variant="outlined" type='password' />}
        />
        <ButtonForm type="submit">
          Submit
        </ButtonForm>
      </form>
    </>
  );
}

export default LoginPage;
