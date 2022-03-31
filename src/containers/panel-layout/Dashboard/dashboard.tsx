import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBudget from "../../../components/form/expense-form/add-budget";
import AddExpense from "../../../components/form/expense-form/add-expense";
import { getBudgetList } from "../../../firebase/firebase";
import { BudgetRecord } from "../../../firebase/firebase.model";
import { useAuth } from "../../../hooks/context/AuthProvider";
import { addBudget, addBudgetList } from "../../../redux/actions";
import { RootState } from "../../../redux/root-reducer";
import classes from "./dashboard.module.scss";

export default function Dashboard() {
  const [totalMoney, setTotalMoney] = useState<number>(0);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const budgets = useSelector((state:RootState) => state.budgets)
  
  useEffect(() => {
    getBudgets();
  }, []);

  const getBudgets = () => {
    getBudgetList(currentUser?.uid || '12').then((data) => {
      let budgetList: BudgetRecord[] = [];
      let money: number = 0;
      data.docs.forEach((budget) => {
        money += Number(budget.data().spendingMoney);
        budgetList.push({
          id: budget.id,
          name: budget.data().name,
          spendingMoney: budget.data().spendingMoney,
          user: budget.data().user,
        });
      });
      dispatch(addBudgetList(budgetList))
      setTotalMoney(money);
    });
  };

  const updateBudgetList = (budget: BudgetRecord) => {
    dispatch(addBudget(budget))
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
