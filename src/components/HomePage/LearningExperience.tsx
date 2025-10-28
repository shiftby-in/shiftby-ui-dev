'use client';

import { alpha, Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import { motion } from 'framer-motion';

const phases = [
  {
    title: 'Discover & map your goals',
    description: 'Kick-off with a skills diagnostic, portfolio audit, and tailored roadmap aligned to your target role.',
    icon: <CheckRoundedIcon color="primary" />,
  },
  {
    title: 'Sprint with mentors weekly',
    description: 'Live project briefs, async feedback loops, and pair sessions keep momentum while fitting your schedule.',
    icon: <VideocamRoundedIcon color="primary" />,
  },
  {
    title: 'Showcase and get hired',
    description: 'Demo day with hiring partners, credentialed certificates, and negotiation coaching for your offers.',
    icon: <WorkspacePremiumRoundedIcon color="primary" />,
  },
];

const MotionCard = motion(Card);

export default function LearningExperience() {
  return (
    <Box component="section" aria-labelledby="learning-experience-title" sx={{ mt: { xs: 6, md: 9 } }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={5}>
          <Stack spacing={2.5}>
            <Typography id="learning-experience-title" variant="h4" fontWeight={800}>
              A high-touch learning experience built around your life
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Cohorts cap at 35 learners to guarantee personalized attention. Every week you unlock curated content,
              tactical mentor feedback, and community rituals designed to keep your confidence compounding.
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <ForumRoundedIcon color="primary" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  Daily Slack standups and async code reviews.
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <WorkspacePremiumRoundedIcon color="primary" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  Industry-recognized certificates and shareable badges.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid container spacing={3}>
            {phases.map((phase, index) => (
              <Grid key={phase.title} item xs={12} sm={6}>
                <MotionCard
                  elevation={0}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    background: (theme) => alpha(theme.palette.background.paper, 0.96),
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ width: 40, height: 40, display: 'grid', placeItems: 'center', borderRadius: 2, backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.16) }}>
                      {phase.icon}
                    </Box>
                    <Typography variant="h6" fontWeight={700}>
                      {phase.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {phase.description}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
