import { Box, Typography } from '@mui/material';
import { BudgetAccount, Goals, IncomeSource, SpendingCategory } from '@prisma/client';
import AccountTransaction from '@/components/molecules/Accounts/AccountTransactionForm';
import BudgetAccountList from '@/components/molecules/Accounts/BudgetAccounts/BudgetAccountList';
import GoalAccountList from '@/components/molecules/Accounts/GoalAccounts/GoalAccountList';
import IncomeAccountList from '@/components/molecules/Accounts/IncomeAccounts/IncomeAccountList';
import SpendingCategoryAccountList from '@/components/molecules/Accounts/SpendingCategoryAccounts/SpendingCategoryAccountList';
import {
  serializeBudgetAccount,
  serializeGoalAccount,
  typeIncomeAccount,
  typeSpendAccount,
} from '@/utils/formatters';

interface AccountsProps {
  budgetAccounts: BudgetAccount[];
  incomeAccounts: IncomeSource[];
  goalAccounts: Goals[];
  spendingAccounts: SpendingCategory[];
}

export default function Accounts({
  budgetAccounts,
  incomeAccounts,
  goalAccounts,
  spendingAccounts,
}: AccountsProps) {
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
        <BudgetAccountList accounts={serializedBudgetAccounts} />
        <IncomeAccountList incomeAccounts={incomeAccounts} />
        <GoalAccountList goalAccounts={serializedGoalAccounts} />
        <SpendingCategoryAccountList SpendingCategoryAccounts={spendingAccounts} />
      </Box>
    </Box>
  );
}
