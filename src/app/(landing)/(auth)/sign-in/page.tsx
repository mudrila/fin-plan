import { Metadata } from 'next';
import SignInForm from '@/app/components/organisms/Forms/SignInForm/SignInForm';
import { APP_SHORT_NAME } from '@/constants/content';

export const metadata: Metadata = {
  title: `Sign In | ${APP_SHORT_NAME}`,
};

export default function SignInPage() {
  return <SignInForm />;
}
