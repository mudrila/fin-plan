import { Metadata } from 'next';
import Budget from '@/app/components/pages/Budget/Budget';

export const metadata: Metadata = {
  title: 'Budget | Fin-Plan',
};

export default async function BudgetPage() {
  return <Budget />;
}
