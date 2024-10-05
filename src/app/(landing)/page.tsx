import { Container } from '@mui/material';
import { APP_NAME } from '@/constants/content';

export default function LandingPage() {
  return (
    <Container
      component="article"
      maxWidth="xl"
    >
      {APP_NAME}
    </Container>
  );
}
