import { Metadata } from 'next';
import Profile from '@/components/pages/User/Profile';
import { APP_SHORT_NAME } from '@/constants/content';
import { auth } from '@/utils/auth';

export const metadata: Metadata = {
  title: `User page | ${APP_SHORT_NAME}`,
};

export default async function UserPage() {
  const session = await auth();
  const userName = session?.user?.name;
  const userId = session?.user?.id;

  if (userName && userId) {
    return (
      <Profile
        userName={userName}
        userId={userId}
      />
    );
  }
}
