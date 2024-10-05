'use client';

import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import NextLink from 'next/link';
import FeatureCard from './FeatureCard';
import { APP_DESCRIPTION, APP_NAME } from '@/constants/content';

export default function Landing() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Container
      component="section"
      maxWidth="lg"
    >
      <Box width="100%">
        <Typography
          variant="h1"
          sx={{
            marginTop: isDesktop ? 0 : 2,
            textWrap: 'balance',
            fontSize: isDesktop ? '4.125rem' : '2.75rem',
            color: theme.palette.primary.main,
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          {APP_NAME}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            marginTop: 3,
            textWrap: 'balance',
            fontSize: isDesktop ? '1.5rem' : '1.25rem',
            color: theme.palette.primary.light,
            textAlign: 'center',
          }}
        >
          {APP_DESCRIPTION}
        </Typography>
      </Box>
      <Grid
        container
        mt={2}
        spacing={2}
      >
        <FeatureCard
          title="Budgetting"
          description="Budget your expenses, track your spendings and income. Visualize your balance and debts!"
          Icon={SpaceDashboardIcon}
          isImplemented
        />
        <FeatureCard
          title="Planning"
          description="Craft your budget for upcoming months... or even years? Put your goals!"
          Icon={DonutSmallIcon}
          isImplemented
        />
        <FeatureCard
          title="Forecasting"
          description="How changing your expenses would impact your finances? Better to see!"
          Icon={MultilineChartIcon}
          isImplemented={false}
        />
        <FeatureCard
          title="Investing"
          description="Visualize your investments as part of your budget. Get advice from experts!"
          Icon={AutoGraphIcon}
          isImplemented={false}
        />
      </Grid>
      <Box
        display="flex"
        justifyContent="center"
        my={2}
      >
        <Button
          variant="contained"
          color="primary"
          LinkComponent={NextLink}
          href="/sign-up"
          size="large"
          sx={{ width: { xs: '100%', md: '50%' } }}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
}
