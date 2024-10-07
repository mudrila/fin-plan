import { Metadata } from 'next';
import Profile from '@/components/pages/User/Account';
import { APP_SHORT_NAME } from '@/constants/content';
import { auth } from '@/utils/auth';

export const metadata: Metadata = {
  title: `Your Account | ${APP_SHORT_NAME}`,
};

export default async function UserPage() {
  const session = await auth();
  const userName = session?.user?.name;

  if (userName) {
    return (
      <Profile
        userName={userName}
      />
    );
  }
}
