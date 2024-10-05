'use client';

import { Box, SvgIconTypeMap, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
  isImplemented: boolean;
}

export default function FeatureCard({ title, description, Icon, isImplemented }: FeatureCardProps) {
  const theme = useTheme();
  return (
    <Grid
      size={{ xs: 12, md: 6, lg: 3 }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '1.25rem',
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.33)',
        borderRadius: 6,
        color: theme.palette.primary.main,
      }}
    >
      <Typography variant="h4">{title}</Typography>
      <Box my={2}>
        <Icon
          fontSize="large"
          sx={{ width: '3rem', height: '3rem' }}
        />
      </Box>
      <Typography>{description}</Typography>
      {!isImplemented && <Typography>Coming Soon</Typography>}
    </Grid>
  );
}
