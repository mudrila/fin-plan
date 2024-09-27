import { Metadata } from 'next';
import BudgetAccountForm from '@/app/components/molecules/BudgetAccount/BudgetAccount';

export const metadata: Metadata = {
  title: 'Dashboard | Fin-Plan',
};

export default function DashboardPage() {
  return <BudgetAccountForm />
}
