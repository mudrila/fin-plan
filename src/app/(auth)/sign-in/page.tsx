import { Metadata } from 'next';

import SignInForm from '@/app/components/organisms/Forms/SignInForm/SignInForm';

export const metadata: Metadata = {
  title: 'Sign In | Fin-Plan',
};

export default function SignInPage() {
  return <SignInForm />;
}
