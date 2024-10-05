import { PropsWithChildren } from 'react';
import NavigationWrapper from '@/components/organisms/Navigation/NavigationSidebar';

export default function AppLayout({ children }: PropsWithChildren) {
  return <NavigationWrapper>{children}</NavigationWrapper>;
}
