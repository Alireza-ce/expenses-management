import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import classes from "./expenses-dialog-list.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useMutation, useQueryClient } from "react-query";
import { deleteExpense } from "../../../firebase/firebase";

type ExpensesDialogProps = {
    expenses: any[],
    onClose: () => void,
    open: boolean,
    budgetName: string
}

export default function ExpensesDialog({ budgetName, expenses, open, onClose }: ExpensesDialogProps) {
    const { mutate, isSuccess, reset: resetMutation, isLoading } = useMutation(deleteExpense);
    const queryClient = useQueryClient();

    const onDeleteBudget = (budgetId: string) => {
        mutate(budgetId, {
            onSuccess: (data) => {
                queryClient.invalidateQueries('totalExpenses');
                onClose();
            }
        })
    };

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
                                <Button className={`${classes.detail_button} ${classes.remove_button}`} onClick={() => onDeleteBudget(expense.id)} disabled={isLoading} type="submit" variant="contained">
                                    {isLoading ? (
                                        <CircularProgress
                                            style={{ width: "24px", height: "24px", color: "white" }}
                                        />
                                    ) : (
                                        "Remove Expense"
                                    )}
                                </Button>
                            </div>
                        </div>}
                </>
            ))}
            {expenses.length === 1 && <p className={classes.empty_list}>Expense list is empty </p>}
        </Dialog>
    );
}
