import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import classes from "./expenses-dialog-list.module.scss";

type ExpensesDialogProps = {
    expenses: any[],
    onClose: () => void,
    open: boolean,
    budgetName: string
}

export default function ExpensesDialog({ budgetName, expenses, open, onClose }: ExpensesDialogProps) {
    return (
        <Dialog onClose={onClose} open={open} >
            <DialogTitle>Budget Name: {budgetName}</DialogTitle>
            {expenses.length > 1 && expenses.map(expense => (
                <>
                    {expense.amount &&
                        <div className={classes.budget_card} key={expense.id}>
                            <div className={classes.card_info}>
                                <p>Description: <span>{expense.description}</span></p>
                                <p>Amount: <span>{expense.amount}$</span></p>
                            </div>
                            <div className={classes.card_buttons}>
                                <Button className={`${classes.detail_button} ${classes.edit_button}`} type="submit" variant="contained">Edit Expense</Button>
                                <Button className={`${classes.detail_button} ${classes.remove_button}`} type="submit" variant="contained">Remove Expense</Button>
                            </div>
                        </div>}
                </>
            ))}
            {expenses.length === 1 && <p className={classes.empty_list}>Expense list is empty </p>}
        </Dialog>
    );
}
