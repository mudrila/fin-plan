import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AccountSettings from '@/components/pages/User/Account';
import { APP_SHORT_NAME } from '@/constants/content';
import { auth } from '@/utils/auth';

export const metadata: Metadata = {
  title: `Account | ${APP_SHORT_NAME}`,
};

export default async function UserPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <AccountSettings
      userEmail={user.email!}
      userImage={user.image!}
      userName={user.name!}
    />
  );
}
