'use client';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Card, CardActionArea, CardHeader, Typography, useTheme } from '@mui/material';
import GoalAccountForm from './GoalAccountForm';
import { IconRenderrer } from '@/components/molecules/IconSelect/IconSelect';
import { SerializedGoal } from '@/types/budget';
import { formatCurrency } from '@/utils/formatters';

interface GoalAccountsProps {
  accounts: SerializedGoal[];
  title: string;
  triggerText: string;
}

function GoalAccounts({ accounts, title, triggerText }: GoalAccountsProps) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">{title}</Typography>
        {accounts.length > 0 && (
          <GoalAccountForm
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
          <GoalAccountForm
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
            <GoalAccountForm
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
                      subheader={formatCurrency(account.monthlyTarget)}
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

interface GoalsListProps {
  goals: SerializedGoal[];
}

export default function GoalsList({ goals }: GoalsListProps) {
  return (
    <Box>
      <GoalAccounts
        accounts={goals}
        title="Goals"
        triggerText="Goal"
      />
    </Box>
  );
}
