'use client';

import { alpha, Box, Card, CardContent, Stack, Typography, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';

const testimonials = [
  {
    quote: 'Shiftby helped me move from support to product in 8 weeks. The weekly mentor syncs and hiring prep were game changers.',
    name: 'Ananya I.',
    role: 'Product Manager, Razorpay',
  },
  {
    quote: 'The program mimics how modern data teams work. I built a portfolio that finally got recruiters calling back.',
    name: 'Rahul S.',
    role: 'Senior Data Analyst, Swiggy',
  },
  {
    quote: 'Every sprint delivered measurable progress. I now lead experimentation at my startup thanks to the confidence I gained.',
    name: 'Meera P.',
    role: 'Growth Engineer, Polygon',
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  const go = (dir: number) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  const testimonial = testimonials[index];

  if (!testimonial) return null;

  return (
    <Box
      component="section"
      aria-label="Learner success stories"
      sx={{
        position: 'relative',
        px: { xs: 0, sm: 4 },
        py: { xs: 4, sm: 6 },
        borderRadius: 4,
        background: (theme) => alpha(theme.palette.primary.main, 0.06),
        overflow: 'hidden',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          What our alumni say
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="Previous testimonial" onClick={() => go(-1)} size="small">
            <ChevronLeft />
          </IconButton>
          <IconButton aria-label="Next testimonial" onClick={() => go(1)} size="small">
            <ChevronRight />
          </IconButton>
        </Stack>
      </Stack>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
              background: (theme) => alpha(theme.palette.background.paper, 0.96),
              boxShadow: '0 20px 45px rgba(17, 24, 39, 0.1)',
            }}
          >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormatQuoteRoundedIcon color="primary" sx={{ fontSize: 36 }} />
              <Typography variant="h6" sx={{ fontStyle: 'italic', lineHeight: 1.5 }}>
                “{testimonial.quote}”
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="subtitle1" fontWeight={700}>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.role}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <Stack direction="row" justifyContent="center" spacing={1.5} sx={{ mt: 3 }}>
        {testimonials.map((_, i) => (
          <Box
            key={i}
            component="button"
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            sx={{
              width: 10,
              height: 10,
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
