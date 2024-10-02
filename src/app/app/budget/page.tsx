import { Metadata } from 'next';
import BudgetAccountForm from '@/app/components/molecules/BudgetAccount/BudgetAccountForm';

export const metadata: Metadata = {
  title: 'Budget | Fin-Plan',
};

export default function BudgetPage() {
  return <BudgetAccountForm />;
}
