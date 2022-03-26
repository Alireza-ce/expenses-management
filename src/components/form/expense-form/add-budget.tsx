import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TextFieldCustom } from "../input";
import classes from "./forms.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ButtonForm } from "../../button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { ArrowUpwardOutlined } from "@mui/icons-material";
import { addBudget } from "../../../firebase/firebase";
import { useAuth } from "../../../hooks/context/AuthProvider";
import { BudgetRecord } from "../../../firebase/firebase.model";

interface BudGetForm {
  name: string;
  spendingMoney: number | string;
}

interface Props {
  updateBudgetList: (budget: BudgetRecord) => void;
}

export default function AddBudget({ updateBudgetList }: Props) {
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BudGetForm>({
    defaultValues: {
      name: "",
      spendingMoney: "",
    },
  });

  const onSubmit: SubmitHandler<BudGetForm> = (data) => {
    setLoadingStatus(true);
    addBudget({ ...data, user: currentUser?.uid })
      .then((res) => {
        updateBudgetList({ ...data, user: currentUser?.uid, id: res.id });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingStatus(false);
      });
  };

  return (
    <div>
      <h2 className={classes.form_title}>
        <ListItemIcon style={{ minWidth: 34 }}>
          <ArrowUpwardOutlined color="success" />
        </ListItemIcon>{" "}
        Add Budget
      </h2>
      <form className={classes.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field }) => (
            <TextFieldCustom
              {...field}
              error={errors.name ? true : false}
              label="Name"
              variant="outlined"
            />
          )}
        />
        {errors?.name && (
          <p className={classes.error_text}>{errors.name?.message}</p>
        )}
        <Controller
          name="spendingMoney"
          control={control}
          rules={{
            required: "This field is required",
            min: { value: 10, message: "Minimum value is 10$" },
          }}
          render={({ field }) => (
            <TextFieldCustom
              {...field}
              error={errors.spendingMoney ? true : false}
              label="Spending Money"
              variant="outlined"
            />
          )}
        />
        {errors?.spendingMoney && (
          <p className={classes.error_text}>{errors.spendingMoney?.message}</p>
        )}
        <ButtonForm type="submit" variant="contained" color="primary">
          {isLoading ? (
            <CircularProgress
              style={{ width: "24px", height: "24px", color: "white" }}
            />
          ) : (
            " Add Budget"
          )}
        </ButtonForm>
      </form>
    </div>
  );
}
