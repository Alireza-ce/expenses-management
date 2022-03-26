export interface BudgetRecord {
  id?: string | number;
  name: string;
  spendingMoney: number | string;
  user: string | undefined;
}

export interface ExpenseRecord {
  id?: string | number;
  description: string;
  amount: number | string;
  user: string | undefined;
  budgetId: string;
}
