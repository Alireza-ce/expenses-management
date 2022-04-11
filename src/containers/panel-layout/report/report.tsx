import Button from "@material-ui/core/Button";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteBudget, getBudgetList, getExpenseByUser } from "../../../firebase/firebase";
import { useAuth } from "../../../hooks/context/AuthProvider";
import classes from "./report.module.scss";

export default function Report() {
  const { currentUser } = useAuth();
  const { mutate, isSuccess, reset: resetMutation } = useMutation(deleteBudget);
  const queryClient = useQueryClient();
  
  const { data: budgets, isLoading, isError } = useQuery(['budgetList', currentUser?.uid], getBudgetList, {
    enabled: !!currentUser,
    select: (data) => {
      let money: number = 0;
      const budgetList = data.docs.map((budget) => {
        money += Number(budget.data().spendingMoney);
        return {
          id: budget.id,
          name: budget.data().name,
          spendingMoney: budget.data().spendingMoney,
          remainingMoney: budget.data().spendingMoney,

          user: budget.data().user,
          children: [{}]
        }
      })
      return { budgetList, totalMoney: money };
    },
  })

  const { data: expenses, isLoading: isLoadingExpenses } = useQuery(['totalExpenses', currentUser?.uid], getExpenseByUser, {
    enabled: !!currentUser && !!budgets,
    select: (data) => {
      let expensesListBaseBudget = budgets?.budgetList;
      data.docs.forEach((budget) => {
        let parentBudget = expensesListBaseBudget?.find(bud => bud?.id === budget.data().budgetId)
        if (parentBudget) {
          parentBudget.remainingMoney -= budget.data().amount;
        }
        let expense = {
          id: budget.id,
          amount: budget.data().amount,
          description: budget.data().description,
        }
        parentBudget?.children.push(expense)
      })
    
      return expensesListBaseBudget;
    },
  })

  const onDeleteBudget = (budgetId:string) => {
    mutate(budgetId, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['budgetList','totalExpenses']);
      }
    })
  };

  if (isLoading || !currentUser || isLoadingExpenses) {
    return <span>Loading...</span>
  }

  if (expenses && expenses?.length === 0) {
    return <span>Your budget list is empty</span>
  }

  return (
    <div className={classes.budgets_cards_wrapper}>
      {expenses?.map(expense => (
        <div className={classes.budget_card} key={expense.id}>
          <div className={classes.card_info}>
            <p>Budget Name: <span>{expense.name}</span></p>
            <p>Total Budget: <span>{expense.spendingMoney}$</span></p>
            <p>Remaining Budget: <span>{expense.remainingMoney}$</span></p>
            <p>Total Expenses: <span>{expense.spendingMoney - expense.remainingMoney}$</span></p>
          </div>
          <div className={classes.card_buttons}>
            <Button className={`${classes.detail_button} ${classes.info_button}`} type="submit" variant="contained">Expenses List</Button>
            <Button className={`${classes.detail_button} ${classes.edit_button}` } type="submit" variant="contained">Edit Budget</Button>
            <Button className={`${classes.detail_button} ${classes.remove_button}`} type="submit" variant="contained" onClick={()=> onDeleteBudget(expense.id)}>Remove Budget</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
