import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TextFieldCustom } from '../input';
import classes from './forms.module.scss';
import CircularProgress from "@material-ui/core/CircularProgress";
import { ButtonForm } from '../../button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ArrowUpwardOutlined } from '@mui/icons-material';

interface BudGetForm {
  name: string,
  spendingMoney: number | string
}

export default function AddBudget() {
  const [isLoading, setLoadingStatus] = useState<boolean>(false);

  const { handleSubmit, control, formState: { errors } } = useForm<BudGetForm>({
    defaultValues: {
      name: '',
      spendingMoney: ''
    }
  });

  const onSubmit: SubmitHandler<BudGetForm> = data => {
    console.log(data)
    setLoadingStatus(true);
    setLoadingStatus(false);
  };

  return (
    <div>
      <h2 className={classes.form_title}>
      <ListItemIcon style={{ minWidth: 34 }}><ArrowUpwardOutlined color='success' /></ListItemIcon> Add Budget
      </h2>
      <form className={classes.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => <TextFieldCustom {...field} error={errors.name ? true : false} label="Name" variant="outlined" />}
        />
        <Controller
          name="spendingMoney"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextFieldCustom {...field} error={errors.spendingMoney ? true : false} label="Spending Money" variant="outlined" />}
        />
        <ButtonForm type="submit" variant="contained" color="primary">
          {isLoading ? <CircularProgress style={{ width: '24px', height: '24px', color: "white" }} /> :' Add Budget'}
        </ButtonForm>
      </form>
    </div>
  )
}
