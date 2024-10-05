import { Typography } from '@mui/material';
import { Metadata } from 'next';
import { APP_SHORT_NAME } from '@/constants/content';

export const metadata: Metadata = {
  title: `Dashboard | ${APP_SHORT_NAME}`,
};

export default function DashboardPage() {
  return <Typography>I am Dashboard page placeholder</Typography>;
}
