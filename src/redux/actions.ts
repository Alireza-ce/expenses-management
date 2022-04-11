export const Add_Budget_List = "Add_Budget_List";
export const Add_Budget = "Add_Budget";

export const addBudgetList = (data: any) => {
  return { type: Add_Budget_List, payload: data };
};

export const addBudget = (data: any) => {
  return {
    type: Add_Budget,
    payload: data,
  };
};
