'use client';

import { Box, Card, CardContent, Typography, Stack, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

type Testimonial = { quote: string; name: string; role?: string };

const testimonials: Testimonial[] = [
  { quote: 'Best practical course experience I’ve had. Landed an offer in 6 weeks.', name: 'Ananya', role: 'Frontend Developer' },
  { quote: 'Clear projects, strong mentorship, and a helpful community.', name: 'Rahul', role: 'Data Analyst' },
  { quote: 'Loved the hands-on approach. Directly applicable at work.', name: 'Meera', role: 'Product Engineer' },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  const go = (dir: number) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  const t = testimonials[index];

  if (!t) return null;

  return (
    <Box component="section" aria-label="Student testimonials" sx={{ position: 'relative' }}>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
        <IconButton aria-label="Previous testimonial" onClick={() => go(-1)} size="small">
          <ChevronLeft />
        </IconButton>

        <Box sx={{ width: '100%', maxWidth: 720 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    &ldquo;{t.quote}&rdquo;
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mt: 1.5 }}>
                    {t.name}
                    {t.role ? ` · ${t.role}` : ''}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </Box>

        <IconButton aria-label="Next testimonial" onClick={() => go(1)} size="small">
          <ChevronRight />
        </IconButton>
      </Stack>

      <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 1.5 }}>
        {testimonials.map((_, i) => (
          <Box
            key={i}
            component="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              border: 0,
              cursor: 'pointer',
              backgroundColor: i === index ? 'primary.main' : 'divider',
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
