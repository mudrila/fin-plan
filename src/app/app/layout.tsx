import { PropsWithChildren } from 'react';
import NavigationWrapper from '@/app/components/organisms/Navigation/NavigationSidebar';

export default function AppLayout({ children }: PropsWithChildren) {
  return <NavigationWrapper>{children}</NavigationWrapper>;
}
