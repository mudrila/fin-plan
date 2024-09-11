import { Metadata } from 'next';

import SignUpForm from '@/app/components/sign-up-form';

export const metadata: Metadata = {
  title: 'Sign Up | Fin-Plan',
};

export default function SignUpPage() {
  return <SignUpForm />;
}
