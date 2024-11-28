import { Box, Typography } from '@mui/material';
import { BudgetAccount, Goal, IncomeSource, SpendingCategory } from '@prisma/client';
import AccountList from '@/components/molecules/Accounts/AccountList';
import AccountTransaction from '@/components/molecules/Accounts/AccountTransactionForm';
import {
  serializeBudgetAccount,
  serializeGoalAccount,
  typeIncomeAccount,
  typeSpendAccount,
} from '@/utils/formatters';

interface BudgetProps {
  budgetAccounts: BudgetAccount[];
  incomeAccounts: IncomeSource[];
  goalAccounts: Goal[];
  spendingAccounts: SpendingCategory[];
  sumGoalTransaction: number;
  sumIncomeTransaction: number;
  sumSpendTransaction: number;
}

export default function Budget({
  budgetAccounts,
  incomeAccounts,
  goalAccounts,
  spendingAccounts,
  sumGoalTransaction,
  sumIncomeTransaction,
  sumSpendTransaction,
}: BudgetProps) {
  const serializedGoalAccounts = goalAccounts.map(serializeGoalAccount);
  const serializedBudgetAccounts = budgetAccounts.map(serializeBudgetAccount);
  const typedIncomeAccounts = incomeAccounts.map(typeIncomeAccount);
  const typedSpendAccounts = spendingAccounts.map(typeSpendAccount);
  return (
    <Box>
      <Box
        justifyContent="space-between"
        display="flex"
      >
        <Typography variant="h5">Budget</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <AccountTransaction
            budgetAccounts={serializedBudgetAccounts}
            incomeAccounts={typedIncomeAccounts}
            spendingAccounts={typedSpendAccounts}
            goalAccounts={serializedGoalAccounts}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <AccountList
          accounts={serializedBudgetAccounts}
          title="Accounts"
          triggerText="Account"
          url="budgetAccount"
          mainText="Budget Account"
          secondText="budget account"
          initialAccountType="Debit"
        />
        <AccountList
          accounts={typedIncomeAccounts}
          title="Income"
          triggerText="Income Source"
          url="income"
          mainText="Income Source"
          secondText="income account"
          initialAccountType="Income"
          sumTransaction={sumIncomeTransaction}
        />
        <AccountList
          accounts={serializedGoalAccounts}
          title="Goals"
          triggerText="Goal"
          url="goal"
          mainText="Goal"
          secondText="goal account"
          initialAccountType="Goal"
          sumTransaction={sumGoalTransaction}
        />
        <AccountList
          accounts={typedSpendAccounts}
          title="Spending Category"
          triggerText="Spending Category"
          url="spendingCategory"
          mainText="Spending Category"
          secondText="spending category"
          initialAccountType="Spending Category"
          sumTransaction={sumSpendTransaction}
        />
      </Box>
    </Box>
  );
}
