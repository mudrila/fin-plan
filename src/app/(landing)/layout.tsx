import { PropsWithChildren } from 'react';
import LandingHeader from '@/components/organisms/Navigation/LandingHeader';

export default function LandingLayout({ children }: PropsWithChildren) {
  return (
    <>
      <LandingHeader />
      <main>{children}</main>
    </>
  );
}
