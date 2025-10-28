'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTABanner() {
  return (
    <Box
      component="section"
      sx={{
        mt: 4,
        p: { xs: 2.5, sm: 3 },
        borderRadius: 2,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <Typography variant="h6" component="h2">
            Ready to learn?
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Join the community and start your next course today.
          </Typography>
        </motion.div>

        <Button
          href="/register"
          component={Link}
          variant="contained"
          color="secondary"
          sx={{ bgcolor: 'common.white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
          aria-label="Register for Shiftby"
        >
          Register
        </Button>
      </Stack>
    </Box>
  );
}
