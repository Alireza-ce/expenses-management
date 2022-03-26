import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TextFieldCustom } from "../input";
import classes from "./forms.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ButtonForm } from "../../button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { ArrowDownward } from "@mui/icons-material";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { BudgetRecord } from "../../../firebase/firebase.model";

interface BudGetForm {
  description: string;
  amount: number | string;
}

interface Props {
  budgets: BudgetRecord[] | undefined;
}

export default function AddExpense({ budgets }: Props) {
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const [budget, setBudget] = React.useState("");
  console.log(budgets);
  const handleChange = (event: any) => {
    setBudget(event.target.value as string);
  };

  useEffect(() => {
    console.log(budgets);
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BudGetForm>({
    defaultValues: {
      description: "",
      amount: "",
    },
  });

  const onSubmit: SubmitHandler<BudGetForm> = (data) => {
    console.log(data);
    setLoadingStatus(true);
    setLoadingStatus(false);
  };

  return (
    <div>
      <h2 className={classes.form_title}>
        <ListItemIcon style={{ minWidth: 34 }}>
          <ArrowDownward color="error" />
        </ListItemIcon>{" "}
        Add Expenses
      </h2>
      <form className={classes.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="description"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <TextFieldCustom
              {...field}
              error={errors.description ? true : false}
              label="Description"
              variant="outlined"
            />
          )}
        />
        <Controller
          name="amount"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextFieldCustom
              {...field}
              error={errors.amount ? true : false}
              label="Amount"
              variant="outlined"
            />
          )}
        />
        <FormControl variant="outlined" style={{ margin: "12px 24px" }}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={budget}
            label="Budget"
            onChange={handleChange}
          >
            {budgets?.map((budget) => (
              <MenuItem value={budget.id} key={budget.id}>
                {budget.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ButtonForm type="submit" variant="contained" color="primary">
          {isLoading ? (
            <CircularProgress
              style={{ width: "24px", height: "24px", color: "white" }}
            />
          ) : (
            "Add Expenses"
          )}
        </ButtonForm>
      </form>
    </div>
  );
}
