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
import AccountForm from '@/components/molecules/Accounts/AccountForm';
import { IconRenderrer } from '@/components/molecules/IconSelect/IconSelect';
import {
  SerializedBudgetAccount,
  SerializedGoal,
  TypedIncomeAccount,
  TypedSpendAccount,
} from '@/types/budget';

interface BudgetAccountsProps {
  accounts:
    | SerializedBudgetAccount[]
    | SerializedGoal[]
    | TypedIncomeAccount[]
    | TypedSpendAccount[];
  title: string;
  triggerText: string;
  initialAccountType?: BudgetAccountType | 'Goal' | 'Income' | 'Spending Category';
  url: string;
  mainText: string;
  secondText: string;
  sumTransaction?: number | null;
}

function BudgetAccounts({
  accounts,
  title,
  initialAccountType,
  triggerText,
  url,
  mainText,
  secondText,
  sumTransaction,
}: BudgetAccountsProps) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">{title}</Typography>
        {accounts.length > 0 && (
          <AccountForm
            initialAccountType={initialAccountType}
            trigger={
              <Button
                variant="outlined"
                endIcon={<AddIcon />}
              >
                {triggerText}
              </Button>
            }
            url={url}
            mainText={mainText}
            secondText={secondText}
          />
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        {accounts.length === 0 ? (
          <AccountForm
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
                    avatar={<AddIcon />}
                    title={`New ${triggerText}`}
                  />
                </CardActionArea>
              </Card>
            }
            initialAccountType={initialAccountType}
            url={url}
            mainText={mainText}
            secondText={secondText}
          />
        ) : (
          accounts.map(account => (
            <AccountForm
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
                    />
                  </CardActionArea>
                </Card>
              }
              url={url}
              mainText={mainText}
              secondText={secondText}
            />
          ))
        )}
      </Box>
      {sumTransaction != undefined && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Card variant="outlined">
            <CardActionArea>
              <CardHeader
                title="Transactions"
                subheader={`Sum: ${sumTransaction}`}
              />
            </CardActionArea>
          </Card>
        </Box>
      )}
    </Box>
  );
}

interface BudgetAccountListProps {
  accounts:
    | SerializedBudgetAccount[]
    | SerializedGoal[]
    | TypedIncomeAccount[]
    | TypedSpendAccount[];
  title: string;
  triggerText: string;
  url: string;
  mainText: string;
  secondText: string;
  initialAccountType?: BudgetAccountType | 'Goal' | 'Income' | 'Spending Category';
  sumTransaction?: number | null;
}

export default function BudgetAccountList({
  accounts,
  title,
  triggerText,
  url,
  mainText,
  secondText,
  initialAccountType,
  sumTransaction,
}: BudgetAccountListProps) {
  return (
    <Box>
      <Divider sx={{ marginY: 2 }} />
      <BudgetAccounts
        accounts={accounts}
        title={title}
        triggerText={triggerText}
        url={url}
        mainText={mainText}
        secondText={secondText}
        initialAccountType={initialAccountType}
        sumTransaction={sumTransaction}
      />
    </Box>
  );
}
