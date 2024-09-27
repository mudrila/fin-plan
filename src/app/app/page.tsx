import { Typography } from '@mui/material';
import { Metadata } from 'next';
import BudgetAccountForm from '@/app/components/molecules/BudgetAccount/BudgetAccount';

export const metadata: Metadata = {
  title: 'Dashboard | Fin-Plan',
};

export default function DashboardPage() {
  return(
    <> 
       <Typography>I am Dashboard page placeholder</Typography>
       <BudgetAccountForm />
    </>
  )
}
