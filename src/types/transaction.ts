export type TypedSpendingCategoryTransaction = {
  type: 'Spending Category';
  id: string;
  fromType: Array<string>;
  toType: Array<string>;
};

export type TypedBudgetTransaction = {
  type: 'Budget';
  id: string;
  fromBudgetAccountId: string;
  toBudgetAccountId: string;
  amount: number;
  fromType: Array<string>;
  toType: Array<string>;
};

export type TypedGoalTransaction = {
  type: 'Goal';
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  fromType: Array<string>;
  toType: Array<string>;
};

export type TypedIncomeTransaction = {
  type: 'Income';
  id: string;
  fromType: Array<string>;
  toType: Array<string>;
};

export type Transaction =
  | TypedBudgetTransaction
  | TypedGoalTransaction
  | TypedIncomeTransaction
  | TypedSpendingCategoryTransaction;

export type NewTransactionData = {
  userId: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
};
