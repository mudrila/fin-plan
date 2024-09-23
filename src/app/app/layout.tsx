import { PropsWithChildren } from 'react';
import MiniDrawer from '@/app/components/navigation/NavigationSidebar';

export default function AppLayout({ children }: PropsWithChildren) {
  return <MiniDrawer>{children}</MiniDrawer>;
}
