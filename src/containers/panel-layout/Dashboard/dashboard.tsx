import React from 'react'
import AddBudget from '../../../components/form/expense-form/add-budget';
import AddExpense from '../../../components/form/expense-form/add-expense';
import classes from './dashboard.module.scss';

export default function Dashboard() {
  return (
    <>
      <div className={classes.cardsTransactions} >
        in this place we put 3 card of spends and ...
      </div>
      <div className={classes.formsGroup}>
        <div className={classes.cardsTransactions}>
          <AddBudget />
        </div>
        <div className={classes.cardsTransactions}>
          <AddExpense />
        </div>
      </div>
    </>
  )
}
