'use client';

import { alpha, Card, CardContent, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);
const G = Grid as any;

const stats = [
  {
    label: 'Alumni placed globally',
    value: '12k+',
    description: 'Working across product, data, and engineering teams in 18 countries.',
    icon: <LeaderboardRoundedIcon color="primary" fontSize="small" />,
  },
  {
    label: 'Mentor network',
    value: '150+',
    description: 'Active experts from top startups guiding every sprint and review.',
    icon: <Diversity3RoundedIcon color="primary" fontSize="small" />,
  },
  {
    label: 'Average salary uplift',
    value: '2.4x',
    description: 'Learners switch roles or earn promotions within 6 months of graduating.',
    icon: <RocketLaunchRoundedIcon color="primary" fontSize="small" />,
  },
  {
    label: 'Course NPS',
    value: '74',
    description: 'Consistently ranked among the highest-rated cohort-based programs in Asia.',
    icon: <WorkspacePremiumRoundedIcon color="primary" fontSize="small" />,
  },
];

export default function ValueCards() {
  return (
    <G container spacing={2.5} component="section" aria-label="Shiftby impact stats">
      {stats.map((stat) => (
        <G key={stat.label} xs={12} sm={6} md={3}>
          <MotionCard
            elevation={0}
            whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(25,118,210,0.12)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            sx={{
              height: '100%',
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              background: (theme) =>
                `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, ${alpha(
                  theme.palette.background.paper,
                  0.98,
                )} 100%)`,
            }}
          >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                {stat.icon}
                <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {stat.label}
                </Typography>
              </Stack>
              <Typography variant="h4" fontWeight={800}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.description}
              </Typography>
            </CardContent>
          </MotionCard>
        </G>
      ))}
    </G>
  );
}
