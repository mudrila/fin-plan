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
import BudgetAccountForm from '@/components/molecules/Accounts/BudgetAccounts/BudgetAccountForm';
import { IconRenderrer } from '@/components/molecules/IconSelect/IconSelect';
import { SerializedBudgetAccount } from '@/types/budget';

interface BudgetAccountsProps {
  accounts: SerializedBudgetAccount[];
  title: string;
  triggerText: string;
  initialAccountType?: BudgetAccountType;
}

function BudgetAccounts({ accounts, title, initialAccountType, triggerText }: BudgetAccountsProps) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">{title}</Typography>
        {accounts.length > 0 && (
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
          <BudgetAccountForm
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
          />
        ) : (
          accounts.map(account => (
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
                    />
                  </CardActionArea>
                </Card>
              }
              initialAccountType={account.type}
            />
          ))
        )}
      </Box>
    </Box>
  );
}

interface BudgetAccountListProps {
  accounts: SerializedBudgetAccount[];
}

export default function BudgetAccountList({ accounts }: BudgetAccountListProps) {
  return (
    <Box>
      <Divider sx={{ marginY: 2 }} />
      <BudgetAccounts
        accounts={accounts}
        title="Accounts"
        triggerText="Account"
      />
      <Divider sx={{ marginY: 2 }} />
    </Box>
  );
}
