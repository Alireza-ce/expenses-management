import { combineReducers } from "redux";
import BudgetReducer from "./budgets-reducer";

const rootReducer = combineReducers({
  budgets: BudgetReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>