import { PropsWithChildren } from 'react';
import NavigationWrapper from '@/app/components/navigation/NavigationSidebar';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <NavigationWrapper>{children}</NavigationWrapper>
    </>
  );
}
