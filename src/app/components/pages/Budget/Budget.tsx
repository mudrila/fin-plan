import { Box, Typography } from '@mui/material';
import BudgetAccountForm from '@/app/components/molecules/BudgetAccount/BudgetAccountForm';
import BudgetAccountList from '@/app/components/molecules/BudgetAccount/BudgetAccountList';
import { auth } from '@/utils/auth';
import { serializeBudgetAccount } from '@/utils/formatters';
import prisma from '@/utils/prisma';

export default async function Budget() {
  const session = await auth();
  const userId = session?.user?.id;

  const dBaccounts = await prisma.budgetAccount.findMany({
    where: { userId },
  });
  const accounts = dBaccounts.map(serializeBudgetAccount);

  const incomeAccounts = accounts.filter(account => account.type === 'Income');
  const debit = accounts.filter(account => account.type === 'Debit');
  const credit = accounts.filter(account => account.type === 'Credit');
  const debt = accounts.filter(account => account.type === 'Debt');
  const goal = accounts.filter(account => account.type === 'Goal');
  const spendingCategories = accounts.filter(account => account.type === 'SpendingCategory');

  const grupedAccounts = {
    incomes: incomeAccounts,
    debits: debit,
    debts: debt,
    credits: credit,
    goals: goal,
    spendingCategorieses: spendingCategories,
  };
  return (
    <Box>
      <Box
        justifyContent="space-between"
        display="flex"
      >
        <Typography variant="h5">Your budget accounts</Typography>
        <BudgetAccountForm />
      </Box>
      <Box sx={{ mt: 2 }}>
        <BudgetAccountList accounts={grupedAccounts} />
      </Box>
    </Box>
  );
}
