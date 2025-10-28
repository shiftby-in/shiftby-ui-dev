'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <Box
      component="section"
      aria-labelledby="hero-title"
      sx={{
        py: { xs: 6, sm: 8 },
        background: 'linear-gradient(180deg, rgba(25,118,210,0.06), transparent)',
      }}
    >
      <Stack
        spacing={2}
        sx={{
          maxWidth: 720,
          mx: 'auto',
          px: 2,
          textAlign: { xs: 'left', sm: 'center' },
          alignItems: { xs: 'flex-start', sm: 'center' },
        }}
      >
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography id="hero-title" component="h1" variant="h3" fontWeight={700}>
            Learn faster. Get hired.
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Typography variant="body1" color="text.secondary">
            Practical, mentor-led courses designed to level up your skills and career.
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
            <Button
              href="/courses"
              component={Link}
              variant="contained"
              color="primary"
              size="large"
              aria-label="Explore Courses"
            >
              Explore Courses
            </Button>
            <Button
              href="/register"
              component={Link}
              variant="outlined"
              color="primary"
              size="large"
              aria-label="Register Now"
            >
              Register
            </Button>
          </Stack>
        </motion.div>
      </Stack>
    </Box>
  );
}
