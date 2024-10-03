import { Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { IconRenderrer } from '@/app/components/molecules/IconSelect/IconSelect';
import { BudgetAccountsProps, SerializedBudgetAccount } from '@/types/budget';

function BudgetAccounts({ accounts, title }: BudgetAccountsProps) {
  return (
    <Box key={title}>
      <Typography
        variant="h6"
        sx={{ textAlign: 'center' }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: 1,
          flexWrap: 'wrap',
        }}
      >
        {accounts.map(account => (
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
        ))}
      </Box>
    </Box>
  );
}

export default function BudgetAccountList({
  accounts,
}: {
  accounts: {
    incomes: SerializedBudgetAccount[];
    debits: SerializedBudgetAccount[];
    debts: SerializedBudgetAccount[];
    credits: SerializedBudgetAccount[];
    goals: SerializedBudgetAccount[];
    spendingCategorieses: SerializedBudgetAccount[];
  };
}) {
  return (
    <Box>
      <Divider sx={{ marginY: 2 }} />
      <BudgetAccounts
        accounts={accounts.incomes}
        title="Income Accounts"
      />
      <BudgetAccounts
        accounts={[...accounts.debits, ...accounts.credits, ...accounts.debts]}
        title="Debt/Credit/Debit Accounts"
      />
      <BudgetAccounts
        accounts={accounts.spendingCategorieses}
        title="Spending Categories Accounts"
      />
      <BudgetAccounts
        accounts={accounts.goals}
        title="Goal Accounts"
      />
      <Divider />
    </Box>
  );
}
