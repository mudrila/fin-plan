import { Box, Typography } from '@mui/material';
import { BudgetAccount, Goal, IncomeSource, SpendingCategory } from '@prisma/client';
import AccountTransaction from '@/components/molecules/Accounts/AccountTransactionForm';
import BudgetAccountList from '@/components/molecules/Accounts/BudgetAccounts/BudgetAccountList';
import GoalsList from '@/components/molecules/Accounts/GoalAccounts/GoalAccountList';
import IncomeAccountList from '@/components/molecules/Accounts/IncomeAccounts/IncomeAccountList';
import SpendingCategoryAccountList from '@/components/molecules/Accounts/SpendingCategoryAccounts/SpendingCategoryAccountList';
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
}

export default function Budget({
  budgetAccounts,
  incomeAccounts,
  goalAccounts,
  spendingAccounts,
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
        <BudgetAccountList accounts={serializedBudgetAccounts} />
        <IncomeAccountList incomeAccounts={incomeAccounts} />
        <GoalsList goals={serializedGoalAccounts} />
        <SpendingCategoryAccountList spendingCategoryAccounts={spendingAccounts} />
      </Box>
    </Box>
  );
}
