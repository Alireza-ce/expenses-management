import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TextFieldCustom } from '../input';
import classes from './forms.module.scss';
import CircularProgress from "@material-ui/core/CircularProgress";
import { ButtonForm } from '../../button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ArrowUpwardOutlined } from '@mui/icons-material';
import { addBudget } from '../../../firebase/firebase';
import { useAuth } from '../../../hooks/context/AuthProvider';

interface BudGetForm {
  name: string,
  spendingMoney: number | string
}

export default function AddBudget() {
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const { handleSubmit, control, formState: { errors } } = useForm<BudGetForm>({
    defaultValues: {
      name: '',
      spendingMoney: ''
    }
  });

  const onSubmit: SubmitHandler<BudGetForm> = data => {
    setLoadingStatus(true);
    addBudget({ ...data, user: currentUser?.uid })
      .then(res => {
        // in this place reset the form values
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoadingStatus(false);
      })
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
          {isLoading ? <CircularProgress style={{ width: '24px', height: '24px', color: "white" }} /> : ' Add Budget'}
        </ButtonForm>
      </form>
    </div>
  )
}
