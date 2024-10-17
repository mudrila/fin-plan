import { Metadata } from 'next';
import SignUpForm from '@/components/organisms/Forms/SignUpForm/SingUpForm';
import { APP_SHORT_NAME } from '@/constants/content';

export const metadata: Metadata = {
  title: `Sign Up | ${APP_SHORT_NAME}`,
};

export default function SignUpPage() {
  return <SignUpForm />;
}
