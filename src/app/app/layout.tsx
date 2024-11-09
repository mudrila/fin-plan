import { PropsWithChildren } from 'react';
import AppLayout from '@/components/templates/AppLayout/AppLayout';

export default function ApplicationLayout({ children }: PropsWithChildren) {
  return <AppLayout>{children}</AppLayout>;
}
