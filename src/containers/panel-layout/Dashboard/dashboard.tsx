import React, { useState } from "react";
import { useQuery } from "react-query";
import AddBudget from "../../../components/form/expense-form/add-budget";
import AddExpense from "../../../components/form/expense-form/add-expense";
import { getBudgetList, getExpenseByUser } from "../../../firebase/firebase";
import { useAuth } from "../../../hooks/context/AuthProvider";
import classes from "./dashboard.module.scss";

export default function Dashboard() {
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
        }
      })
      return { budgetList, totalMoney: money };
    },
  })

  const { data: expenses, isLoading: isLoadingExpenses } = useQuery(['totalExpenses', currentUser?.uid], getExpenseByUser, {
    enabled: !!!!currentUser,
    select: (data) => {
      let totalExpenses: number = 0;
      data.docs.forEach(expense => {
        totalExpenses += Number(expense.data().amount);
      })
      return totalExpenses;
    },
  })

  if (isLoading || !currentUser || isLoadingExpenses) {
    return <span>Loading...</span>
  }

  return (
    <>
      <div className={classes.cardsTransactions}>
        in this place we put 3 card of spends and ...
       expense: {expenses} -  total: {budgets?.totalMoney} - remain: {(budgets && expenses) && budgets?.totalMoney - expenses}
      </div>
      <div className={classes.formsGroup}>
        <div className={classes.cardsTransactions}>
          <AddBudget />
        </div>
        <div className={classes.cardsTransactions}>
          <AddExpense budgets={budgets?.budgetList} />
        </div>
      </div>
    </>
  );
}
