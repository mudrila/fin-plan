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
import { SpendingCategory } from '@prisma/client';
import SpendingCategoryAccountForm from './SpendingCategoryAccountForm';
import { IconRenderrer } from '@/components/molecules/IconSelect/IconSelect';

interface SpendingCategoryAccountsProps {
  accounts: SpendingCategory[];
  title: string;
  triggerText: string;
}

function SpendingAccounts({ accounts, title, triggerText }: SpendingCategoryAccountsProps) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">{title}</Typography>
        {accounts.length > 0 && (
          <SpendingCategoryAccountForm
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
          <SpendingCategoryAccountForm
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
            <SpendingCategoryAccountForm
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
            />
          ))
        )}
      </Box>
    </Box>
  );
}

interface SpendingCategoryAccountListProps {
  SpendingCategoryAccounts: SpendingCategory[];
}

export default function SpendingCategoryList({
  SpendingCategoryAccounts,
}: SpendingCategoryAccountListProps) {
  return (
    <Box>
      <Divider sx={{ marginY: 2 }} />
      <SpendingAccounts
        accounts={SpendingCategoryAccounts}
        title="Spending Category"
        triggerText="Spending Category"
      />
      <Divider sx={{ marginY: 2 }} />
    </Box>
  );
}
