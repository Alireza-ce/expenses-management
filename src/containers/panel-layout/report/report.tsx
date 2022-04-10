import React from "react";
import { useQuery } from "react-query";
import { getBudgetList, getExpenseByUser } from "../../../firebase/firebase";
import { useAuth } from "../../../hooks/context/AuthProvider";
import classes from "./report.module.scss";

export default function Report() {
  const { currentUser } = useAuth();

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
        let expense = {
          id: budget.id,
          amount: budget.data().amount,
          description: budget.data().description,
        }
        parentBudget?.children.push(expense)
      })
      console.log(expensesListBaseBudget)
      return expensesListBaseBudget;
    },
  })

  if (isLoading || !currentUser || isLoadingExpenses) {
    return <span>Loading...</span>
  }

  return (
    <>
      report list page
    </>
  );
}
