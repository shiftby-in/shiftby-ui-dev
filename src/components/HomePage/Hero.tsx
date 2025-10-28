'use client';

import { alpha, Box, Button, Chip, Stack, Typography } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionStack = motion(Stack);

export default function Hero() {
  return (
    <Box
      component="section"
      aria-labelledby="hero-title"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: { xs: 4, md: 6 },
        px: { xs: 3, sm: 6 },
        py: { xs: 8, sm: 10, md: 12 },
        background: (theme) =>
          `radial-gradient(circle at top left, ${alpha(theme.palette.primary.main, 0.18)}, transparent 45%),` +
          `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.background.paper, 0.92)} 55%, ${theme.palette.background.paper} 100%)`,
        boxShadow: (theme) => `inset 0 1px 0 ${alpha(theme.palette.common.white, 0.6)}`,
        mb: { xs: 6, sm: 8 },
      }}
    >
      <MotionStack
        spacing={3.5}
        sx={{ maxWidth: { xs: '100%', md: 680 } }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            icon={<VerifiedRoundedIcon fontSize="small" />}
            label="Mentor-led, job ready"
            color="default"
            sx={{
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12),
              color: 'primary.main',
              fontWeight: 600,
              px: 1,
            }}
          />
          <Typography component="span" variant="body2" color="text.secondary">
            Built for ambitious professionals
          </Typography>
        </Stack>

        <Typography
          id="hero-title"
          component="h1"
          variant="h2"
          sx={{
            fontWeight: 800,
            letterSpacing: { xs: '-0.02em', md: '-0.03em' },
            fontSize: { xs: '2.4rem', sm: '3rem', md: '3.5rem' },
          }}
        >
          Level up faster with immersive, mentor-guided tech courses
        </Typography>

        <Typography component="p" variant="h6" color="text.secondary" sx={{ maxWidth: 540 }}>
          Build a portfolio of real projects, unlock interviews with hiring partners, and join a community of
          practitioners invested in your success.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
          <Button
            href="/courses"
            component={Link}
            variant="contained"
            color="primary"
            size="large"
            aria-label="Browse courses"
            sx={{ py: 1.5, px: 4, fontWeight: 700 }}
          >
            Explore courses
          </Button>
          <Button
            href="/register"
            component={Link}
            variant="outlined"
            color="inherit"
            size="large"
            aria-label="Join the next cohort"
            sx={{ py: 1.5, px: 4, fontWeight: 700, borderColor: alpha('#fff', 0.3) }}
          >
            Join the next cohort
          </Button>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 4 }} sx={{ pt: 2 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <TrendingUpRoundedIcon color="primary" />
            <Stack spacing={0.2}>
              <Typography variant="subtitle1" fontWeight={700}>
                92% job-ready outcomes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Alumni land roles in 3 months on average
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <AutoAwesomeRoundedIcon color="primary" />
            <Stack spacing={0.2}>
              <Typography variant="subtitle1" fontWeight={700}>
                Practitioners as mentors
              </Typography>
              <Typography variant="body2" color="text.secondary">
                1:1 guidance and weekly feedback rituals
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </MotionStack>
    </Box>
  );
}
