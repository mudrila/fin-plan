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
import { IncomeSource } from '@prisma/client';
import IncomeAccountForm from './IncomeAccountForm';
import { IconRenderrer } from '@/components/molecules/IconSelect/IconSelect';

interface IncomeAccountsProps {
  accounts: IncomeSource[];
  title: string;
  triggerText: string;
}

function IncomeAccounts({ accounts, title, triggerText }: IncomeAccountsProps) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">{title}</Typography>
        {accounts.length > 0 && (
          <IncomeAccountForm
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
          <IncomeAccountForm
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
            <IncomeAccountForm
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

interface incomeAccountListProps {
  incomeAccounts: IncomeSource[];
}

export default function IncomeAccountList({ incomeAccounts }: incomeAccountListProps) {
  return (
    <Box>
      <IncomeAccounts
        accounts={incomeAccounts}
        title="Income"
        triggerText="Income Source"
      />
      <Divider sx={{ marginY: 2 }} />
    </Box>
  );
}
