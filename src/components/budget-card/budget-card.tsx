import Button from "@material-ui/core/Button";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteBudget } from "../../firebase/firebase";
import classes from "./budget-card.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function BudgetCard({ expense }: any) {
    const { mutate, isSuccess, reset: resetMutation, isLoading } = useMutation(deleteBudget);
    const queryClient = useQueryClient();


    const onDeleteBudget = (budgetId: string) => {

        console.log('budgetId', budgetId)
        mutate(budgetId, {
            onSuccess: (data) => {
                queryClient.invalidateQueries('budgetList');
            }
        })
    };

    return (
        <div className={classes.budget_card}>
            <div className={classes.card_info}>
                <p>Budget Name: <span>{expense.name}</span></p>
                <p>Total Budget: <span>{expense.spendingMoney}$</span></p>
                <p>Remaining Budget: <span>{expense.remainingMoney}$</span></p>
                <p>Total Expenses: <span>{expense.spendingMoney - expense.remainingMoney}$</span></p>
            </div>
            <div className={classes.card_buttons}>
                <Button className={`${classes.detail_button} ${classes.info_button}`} type="submit" variant="contained">Expenses List</Button>
                <Button className={`${classes.detail_button} ${classes.edit_button}`} type="submit" variant="contained">Edit Budget</Button>
                <Button className={`${classes.detail_button} ${classes.remove_button}`} type="submit" variant="contained" onClick={() => onDeleteBudget(expense.id)} disabled={isLoading}>
                    {isLoading ? (
                        <CircularProgress
                            style={{ width: "24px", height: "24px", color: "white" }}
                        />
                    ) : (
                        "  Remove Budget"
                    )}
                </Button>
            </div>
        </div>
    );
}
