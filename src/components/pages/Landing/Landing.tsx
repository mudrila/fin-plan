'use client';

import {
  AccountBalance,
  Timeline,
  Notifications,
  Security,
  ArrowForward,
} from '@mui/icons-material';
import { Box, Button, Container, Grid, Paper, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { APP_NAME, APP_DESCRIPTION } from '@/constants/content';

interface Feature {
  title: string;
  description: string;
  icon: typeof AccountBalance;
  comingSoon?: boolean;
}

const features: Feature[] = [
  {
    title: 'Smart Budgeting',
    description: 'Set, track, and achieve your financial goals with intelligent budgeting tools.',
    icon: AccountBalance,
  },
  {
    title: 'Expense Analytics',
    description: 'Visualize your spending patterns with detailed analytics and insights.',
    icon: Timeline,
  },
  {
    title: 'Smart Notifications',
    description: 'Stay on top of your finances with intelligent alerts and reminders.',
    icon: Notifications,
    comingSoon: true,
  },
  {
    title: 'Secure Platform',
    description: 'Your financial data is protected with enterprise-grade security.',
    icon: Security,
  },
];

export default function Landing() {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Container
        maxWidth="lg"
        sx={{ mb: { xs: 8, md: 12 } }}
      >
        <Grid
          container
          spacing={4}
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.75rem' },
                fontWeight: 700,
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {APP_NAME}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                color: 'text.secondary',
                mb: 4,
                fontWeight: 400,
              }}
            >
              {APP_DESCRIPTION}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                component={Link}
                href="/sign-up"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Get Started
              </Button>
              <Button
                component={Link}
                href="/sign-in"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Sign In
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          {features.map((feature, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  position: 'relative',
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'rgba(30, 30, 36, 0.8)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 2,
                  border: `1px solid ${
                    theme.palette.mode === 'light'
                      ? 'rgba(0, 0, 0, 0.05)'
                      : 'rgba(255, 255, 255, 0.05)'
                  }`,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                    backgroundColor:
                      theme.palette.mode === 'light'
                        ? 'rgba(255, 255, 255, 1)'
                        : 'rgba(30, 30, 36, 0.95)',
                  },
                }}
              >
                {feature.comingSoon && (
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                    }}
                  >
                    Coming Soon
                  </Typography>
                )}
                <feature.icon
                  sx={{
                    fontSize: 40,
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h6"
                  gutterBottom
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
