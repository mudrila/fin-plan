import { Box, Typography } from '@mui/material';
import BudgetAccountForm from '@/app/components/molecules/BudgetAccount/BudgetAccountForm';
import BudgetAccountList from '@/app/components/molecules/BudgetAccount/BudgetAccountList';
import { SerializedBudgetAccount } from '@/constants/content';

export default function Budget({ accounts }: { accounts: SerializedBudgetAccount[] }) {
  return (
    <Box>
      <Box
        justifyContent={'space-between'}
        display={'flex'}
      >
        <Typography variant="h5">Your budget accounts</Typography>
        <BudgetAccountForm />
      </Box>
      <Box sx={{ mt: 2 }}>
        <BudgetAccountList accounts={accounts} />
      </Box>
    </Box>
  );
}
