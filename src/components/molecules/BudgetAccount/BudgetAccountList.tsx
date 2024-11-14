'use client';

import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import { BudgetAccountType } from '@prisma/client';
import BudgetAccountForm from '@/components/molecules/BudgetAccount/BudgetAccountForm';
import { IconRenderrer } from '@/components/molecules/IconSelect/IconSelect';
import { SerializedBudgetAccount } from '@/types/budget';
import { formatCurrency } from '@/utils/formatters';

interface BudgetAccountsProps {
  accounts: SerializedBudgetAccount[];
  title: string;
  triggerText: string;
  initialAccountType?: BudgetAccountType;
}

function BudgetAccounts({ accounts, title, initialAccountType, triggerText }: BudgetAccountsProps) {
  const theme = useTheme();
  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Box
        sx={{
          display: 'flex',
          padding: 1,
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        {accounts.map(account => (
          <BudgetAccountForm
            key={account.id}
            account={account}
            trigger={
              <Card
                variant="outlined"
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <CardActionArea>
                  <CardHeader
                    avatar={account.icon ? <IconRenderrer iconName={account.icon} /> : undefined}
                    title={account.title}
                    subheader={formatCurrency(account.monthlyLimit)}
                  />
                </CardActionArea>
              </Card>
            }
          />
        ))}
        <BudgetAccountForm
          initialAccountType={initialAccountType}
          trigger={
            <Button
              variant="outlined"
              endIcon={<AddIcon />}
            >
              {triggerText}
            </Button>
          }
        />
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
    spendingCategories: SerializedBudgetAccount[];
  };
}) {
  return (
    <Box>
      <Divider sx={{ marginY: 2 }} />
      <BudgetAccounts
        accounts={accounts.incomes}
        initialAccountType={BudgetAccountType.Income}
        title="Income"
        triggerText="Income Source"
      />
      <Divider sx={{ marginY: 2 }} />
      <BudgetAccounts
        accounts={[...accounts.debits, ...accounts.credits, ...accounts.debts]}
        title="Accounts"
        triggerText="Account"
      />
      <Divider sx={{ marginY: 2 }} />
      <BudgetAccounts
        accounts={accounts.spendingCategories}
        initialAccountType={BudgetAccountType.SpendingCategory}
        title="Spending Categories"
        triggerText="Spending Category"
      />
      <Divider sx={{ marginY: 2 }} />
      <BudgetAccounts
        accounts={accounts.goals}
        initialAccountType={BudgetAccountType.Goal}
        title="Goals"
        triggerText="Goal"
      />
    </Box>
  );
}
