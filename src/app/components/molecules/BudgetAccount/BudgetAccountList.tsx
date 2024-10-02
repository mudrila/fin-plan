'use client';
import { Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { IconRenderrer } from '@/app/components/molecules/IconSelect/IconSelect';
import { SerializedBudgetAccount } from '@/constants/content';

export default function BudgetAccountList({ accounts }: { accounts: SerializedBudgetAccount[] }) {
  const [budgetAccounts, setBudgetAccounts] = useState<{
    incomeAccounts: SerializedBudgetAccount[];
    debtCreditDebitGoalAccounts: SerializedBudgetAccount[];
    spendingCategories: SerializedBudgetAccount[];
  } | null>(null);

  useEffect(() => {
    const incomeAccounts = accounts.filter(
      (account: SerializedBudgetAccount) => account.type === 'Income',
    );
    const debtCreditDebitGoalAccounts = accounts.filter((account: SerializedBudgetAccount) =>
      ['Debit', 'Credit', 'Debt', 'Goal'].includes(account.type),
    );
    const spendingCategories = accounts.filter(
      (account: SerializedBudgetAccount) => account.type === 'SpendingCategory',
    );

    setBudgetAccounts({
      incomeAccounts,
      debtCreditDebitGoalAccounts,
      spendingCategories,
    });
  }, [accounts]);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Divider sx={{ marginY: 2 }} />
      {[
        { accounts: budgetAccounts?.incomeAccounts, title: 'Income Accounts' },
        {
          accounts: budgetAccounts?.debtCreditDebitGoalAccounts,
          title: 'Debt/Credit/Debit/Goal Accounts',
        },
        { accounts: budgetAccounts?.spendingCategories, title: 'Spending Categories' },
      ].map((group, index) => {
        return (
          <Box key={index}>
            <Typography
              variant="h6"
              sx={{ textAlign: 'center' }}
            >
              {group.title}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                margin: 1,
                flexWrap: 'wrap',
              }}
            >
              {group.accounts?.map(account => {
                return (
                  <Card
                    key={account.id}
                    sx={{ width: 150, height: 150, marginBottom: 1, marginRight: 1 }}
                  >
                    <CardHeader
                      title={
                        account.icon ? (
                          <Box
                            display="flex"
                            alignItems="center"
                          >
                            <IconRenderrer iconName={account.icon} />
                            <Box ml={1}>{account.title}</Box>
                          </Box>
                        ) : (
                          account.title
                        )
                      }
                    />
                    <CardContent>{`Limit: ${account.monthlyLimit}`}</CardContent>
                  </Card>
                );
              })}
            </Box>
          </Box>
        );
      })}
      <Divider />
    </Box>
  );
}
