import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import AddBudget from "../../../components/form/expense-form/add-budget";
import AddExpense from "../../../components/form/expense-form/add-expense";
import { getBudgetList } from "../../../firebase/firebase";
import { BudgetRecord } from "../../../firebase/firebase.model";
import classes from "./dashboard.module.scss";

export default function Dashboard() {
  const [budgets, setBudget] = useState<BudgetRecord[]>();

  useEffect(() => {
    getBudgets();
  }, []);

  const getBudgets = () => {
    getBudgetList.then((data) => {
      let budgetList: BudgetRecord[] = [];
      console.log("res:", data);
      data.docs.forEach((budget) => {
        budgetList.push({
          id: budget.id,
          name: budget.data().name,
          spendingMoney: budget.data().spendingMoney,
          user: budget.data().user,
        });
      });
      setBudget(budgetList);
    });
  };

  const updateBudgetList = (budget: BudgetRecord) => {
    let budgetList = budgets || [];
    budgetList.push(budget);
    setBudget(budgetList);
    console.log(budgetList, budget, budgets);
  };

  return (
    <>
      <div className={classes.cardsTransactions}>
        in this place we put 3 card of spends and ...
      </div>
      <div className={classes.formsGroup}>
        <div className={classes.cardsTransactions}>
          <AddBudget updateBudgetList={updateBudgetList} />
        </div>
        <div className={classes.cardsTransactions}>
          <AddExpense budgets={budgets} />
        </div>
      </div>
    </>
  );
}
