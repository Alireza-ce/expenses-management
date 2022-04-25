import React from "react";
import { useQuery } from "react-query";
import BudgetCard from "../../../components/budget-card/budget-card";
import { getBudgetList, getExpenseByUser } from "../../../firebase/firebase";
import { useAuth } from "../../../hooks/context/AuthProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
import classes from "./report.module.scss";

export default function Report() {
  const { currentUser } = useAuth();

  const { data: budgets, isLoading, isError, isFetching } = useQuery(['budgetList', currentUser?.uid], getBudgetList, {
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

  if (isLoading || !currentUser || isLoadingExpenses) {
    return (<div className={classes.loading_container}>
      <CircularProgress
        style={{ width: "24px", height: "24px", color: "white" }}
      />
    </div>)
  }

  if (expenses && expenses?.length === 0) {
    return <span>Your budget list is empty</span>
  }

  return (
    <div className={classes.budgets_cards_wrapper}>
      {expenses?.map(expense => (
        <BudgetCard expense={expense} key={expense.id} />
      ))}
    </div>
  );
}
