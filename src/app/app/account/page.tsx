import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Profile from '@/components/pages/User/Account';
import { APP_SHORT_NAME } from '@/constants/content';
import { auth } from '@/utils/auth';

export const metadata: Metadata = {
  title: `Your Account | ${APP_SHORT_NAME}`,
};

export default async function UserPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <Profile
      userEmail={user.email!}
      userImage={user.image!}
      userName={user.name!}
    />
  );
}
