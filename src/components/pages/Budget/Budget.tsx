import { Box, Typography } from '@mui/material';
import { BudgetAccount } from '@prisma/client';
import BudgetAccountForm from '@/components/molecules/BudgetAccount/BudgetAccountForm';
import BudgetAccountList from '@/components/molecules/BudgetAccount/BudgetAccountList';
import BudgetAccountTransaction from '@/components/molecules/BudgetAccount/BudgetAccountTransactionForm';
import { serializeBudgetAccount } from '@/utils/formatters';

export default function Budget({ budgetAccounts }: { budgetAccounts: BudgetAccount[] }) {
  const serializedBudgetAccounts = budgetAccounts.map(serializeBudgetAccount);

  const incomes = serializedBudgetAccounts.filter(account => account.type === 'Income');
  const debits = serializedBudgetAccounts.filter(account => account.type === 'Debit');
  const credits = serializedBudgetAccounts.filter(account => account.type === 'Credit');
  const debts = serializedBudgetAccounts.filter(account => account.type === 'Debt');
  const goals = serializedBudgetAccounts.filter(account => account.type === 'Goal');
  const spendingCategories = serializedBudgetAccounts.filter(
    account => account.type === 'SpendingCategory',
  );

  const groupedAccounts = { incomes, debits, credits, debts, goals, spendingCategories };
  return (
    <Box>
      <Box
        justifyContent="space-between"
        display="flex"
      >
        <Typography variant="h5">Budget</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <BudgetAccountTransaction accounts={serializedBudgetAccounts} />
          <BudgetAccountForm />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <BudgetAccountList accounts={groupedAccounts} />
      </Box>
    </Box>
  );
}
