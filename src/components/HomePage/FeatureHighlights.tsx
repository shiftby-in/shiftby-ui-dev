'use client';

import { alpha, Box, Card, CardContent, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Career accelerator curriculum',
    description:
      'Adaptive learning paths blend async lessons, mentor office hours, and live projects so you stay challenged without burning out.',
    icon: <InsightsRoundedIcon color="primary" fontSize="large" />,
  },
  {
    title: 'Embedded hiring network',
    description:
      'Get fast-tracked to pre-vetted hiring partners and mock interviews with product leaders who know what top teams expect.',
    icon: <GroupsRoundedIcon color="primary" fontSize="large" />,
  },
  {
    title: 'Workflow-ready toolkits',
    description:
      'Ship real deliverables using the same toolchains, analytics dashboards, and collaboration rituals used inside high-growth orgs.',
    icon: <BuildRoundedIcon color="primary" fontSize="large" />,
  },
  {
    title: 'Progress you can see',
    description:
      'Personalized analytics show your skill growth week-on-week with snapshots to share in reviews and applications.',
    icon: <ScheduleRoundedIcon color="primary" fontSize="large" />,
  },
];

const MotionCard = motion(Card);
const G = Grid as any;

export default function FeatureHighlights() {
  return (
    <Box component="section" aria-labelledby="feature-highlights-title" sx={{ mt: { xs: 6, md: 8 } }}>
      <Stack spacing={1.5} sx={{ maxWidth: 640, textAlign: { xs: 'left', md: 'center' }, mx: 'auto', mb: 4 }}>
        <Typography id="feature-highlights-title" variant="h4" fontWeight={800}>
          Designed to remove friction from upskilling
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Every cohort is engineered with data-driven learning science and deep industry partnerships so you learn what
          matters, faster.
        </Typography>
      </Stack>

      <G container spacing={3}>
        {features.map((feature) => (
          <G key={feature.title} xs={12} sm={6}>
            <MotionCard
              elevation={0}
              whileHover={{ y: -8, boxShadow: '0 24px 45px rgba(25,118,210,0.14)' }}
              transition={{ duration: 0.35 }}
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                background: (theme) => alpha(theme.palette.background.paper, 0.92),
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ width: 48, height: 48, display: 'grid', placeItems: 'center', borderRadius: 2, backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12) }}>
                  {feature.icon}
                </Box>
                <Stack spacing={1}>
                  <Typography variant="h6" fontWeight={700}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Stack>
              </CardContent>
            </MotionCard>
          </G>
        ))}
      </G>
    </Box>
  );
}
