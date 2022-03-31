import { Add_Budget, Add_Budget_List } from "./actions";

const initialState: any[] = [];

interface Action {
  type: string;
  payload: any[];
}

const BudgetReducer = (state: any[] = initialState, action: Action) => {
  switch (action.type) {
    case Add_Budget_List:
      return action.payload;
    case Add_Budget:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default BudgetReducer;
