'use client';

import { Card, CardContent, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);
const G = Grid as any;

const items = [
  { title: '10K+ Learners', subtitle: 'Growing global community' },
  { title: '98% Satisfaction', subtitle: 'Top-rated cohorts' },
  { title: 'Hands-On Projects', subtitle: 'Build real-world apps' },
];

export default function QuickStats() {
  return (
    <G container spacing={2} component="section" aria-label="Program quick stats">
      {items.map((it) => (
        <G key={it.title} xs={12} sm={4}>
          <MotionCard
            elevation={0}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              height: '100%',
            }}
          >
            <CardContent>
              <Stack spacing={0.5}>
                <Typography variant="h5" fontWeight={800}>
                  {it.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {it.subtitle}
                </Typography>
              </Stack>
            </CardContent>
          </MotionCard>
        </G>
      ))}
    </G>
  );
}

