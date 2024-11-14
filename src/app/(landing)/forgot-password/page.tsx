import { Metadata } from 'next';
import ForgotPassword from '@/components/organisms/Forms/ForgotPasswordForm/ForgotPasswordForm';
import { APP_SHORT_NAME } from '@/constants/content';

export const metadata: Metadata = {
  title: `Forgot Password | ${APP_SHORT_NAME}`,
};

export default async function ForgotPasswordPage() {
  return <ForgotPassword />;
}
