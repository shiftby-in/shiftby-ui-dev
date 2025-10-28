'use client';

import { alpha, Box, Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import Link from 'next/link';
import { motion } from 'framer-motion';

export type CourseSummary = {
  id: string | number;
  title: string;
  summary?: string;
  thumbnail_url?: string;
  slug?: string;
};

type Props = {
  courses: CourseSummary[];
};

const MotionCard = motion(Card);
const G = Grid as any;

export default function CourseShowcase({ courses }: Props) {
  return (
    <Box component="section" aria-labelledby="course-showcase-title" sx={{ mt: { xs: 6, md: 8 } }}>
      <Stack spacing={1.5} sx={{ textAlign: { xs: 'left', md: 'center' }, mx: 'auto', maxWidth: 720, mb: 4 }}>
        <Chip
          icon={<AutoStoriesRoundedIcon fontSize="small" />}
          label="Featured learning paths"
          color="primary"
          variant="outlined"
          sx={{ alignSelf: { xs: 'flex-start', md: 'center' }, fontWeight: 600 }}
        />
        <Typography id="course-showcase-title" variant="h4" fontWeight={800}>
          Choose a cohort that matches your next big career move
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore mentor-led programs that combine hands-on projects, portfolio-ready artefacts, and curated interview prep
          so you can step into high-impact roles with confidence.
        </Typography>
      </Stack>

      {courses.length > 0 ? (
        <G container spacing={3}>
          {courses.map((course) => (
            <G key={course.id} xs={12} md={4}>
              <Link
                href={course.slug ? `/courses/${course.slug}` : `/courses/${course.id}`}
                style={{ textDecoration: 'none' }}
              >
                <MotionCard
                  elevation={0}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.35 }}
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    background: (theme) => alpha(theme.palette.background.paper, 0.96),
                    overflow: 'hidden',
                    height: '100%',
                  }}
                >
                  <CardActionArea sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        width: '100%',
                        height: 160,
                        borderRadius: 2,
                        background: (theme) =>
                          `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(
                            theme.palette.primary.dark,
                            0.12,
                          )} 60%, transparent 100%)`,
                        border: '1px dashed',
                        borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
                      }}
                    />
                    <Stack spacing={1.5}>
                      <Typography variant="h6" fontWeight={700}>
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.summary ?? 'A mentor-guided journey packed with real deliverables and hiring support.'}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        <Typography variant="body2" fontWeight={700}>
                          Explore syllabus
                        </Typography>
                        <ArrowForwardRoundedIcon fontSize="small" />
                      </Stack>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </MotionCard>
              </Link>
            </G>
          ))}
        </G>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Cohorts are launching soon. Join the waitlist to be the first to know.
        </Typography>
      )}
    </Box>
  );
}
