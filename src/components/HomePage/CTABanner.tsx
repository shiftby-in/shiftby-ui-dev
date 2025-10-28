'use client';

import { alpha, Box, Button, Stack, Typography } from '@mui/material';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTABanner() {
  return (
    <Box
      component="section"
      sx={{
        mt: { xs: 8, md: 10 },
        borderRadius: 4,
        px: { xs: 3, sm: 6 },
        py: { xs: 6, sm: 7 },
        position: 'relative',
        overflow: 'hidden',
        background: (theme) =>
          `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'primary.contrastText',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at top right, rgba(255,255,255,0.22), transparent 55%)',
          pointerEvents: 'none',
        }}
      />
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent="space-between"
        sx={{ position: 'relative' }}
      >
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <RocketLaunchRoundedIcon fontSize="small" />
              <Typography variant="overline" sx={{ letterSpacing: '0.08em', fontWeight: 700 }}>
                Ready for your next role?
              </Typography>
            </Stack>
            <Typography variant="h4" component="h2" fontWeight={800}>
              Join a Shiftby cohort and ship career-defining work in weeks
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.92 }}>
              Save your seat for the upcoming cohort, access exclusive mentor sessions, and unlock tailored interview
              preparation that helps you stand out from the first screen.
            </Typography>
          </Stack>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              href="/register"
              component={Link}
              variant="contained"
              color="secondary"
              size="large"
              aria-label="Reserve your seat"
              sx={{
                fontWeight: 700,
                px: 4,
                py: 1.5,
                backgroundColor: 'common.white',
                color: 'primary.main',
                '&:hover': { backgroundColor: 'grey.100' },
              }}
            >
              Reserve your seat
            </Button>
            <Button
              href="/courses"
              component={Link}
              variant="outlined"
              color="inherit"
              size="large"
              aria-label="View curriculum"
              sx={{ fontWeight: 700, px: 4, py: 1.5, borderColor: alpha('#fff', 0.4) }}
            >
              View curriculum
            </Button>
          </Stack>
        </motion.div>
      </Stack>
    </Box>
  );
}
