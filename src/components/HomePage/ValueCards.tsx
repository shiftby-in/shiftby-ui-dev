'use client';

import { Grid, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const values = [
  { label: 'Learners', value: '12k+' },
  { label: 'Courses', value: '45+' },
  { label: 'Placement Rate', value: '92%' },
  { label: 'Avg. Rating', value: '4.8/5' },
];

export default function ValueCards() {
  return (
    <Grid container spacing={2} component="section" aria-label="Quick stats">
      {values.slice(0, 4).map((v) => (
        <Grid key={v.label} item xs={6} sm={3}>
          <MotionCard
            elevation={0}
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          >
            <CardContent
              sx={{ textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
            >
              <Typography variant="h5" fontWeight={700}>
                {v.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {v.label}
              </Typography>
            </CardContent>
          </MotionCard>
        </Grid>
      ))}
    </Grid>
  );
}
