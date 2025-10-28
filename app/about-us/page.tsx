'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Link from 'next/link'

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, when: 'beforeChildren' },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export default function AboutUsPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <Stack spacing={3}>
          <motion.div variants={itemVariants}>
            <Typography variant="h3" component="h1" fontWeight={800} sx={{ fontSize: { xs: 28, sm: 36 } }} gutterBottom>
              About Shiftby Training
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: 16, sm: 18 }, lineHeight: 1.6 }}>
              We help learners build job‑ready skills through practical, industry‑aligned courses designed for busy professionals.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Paper elevation={1} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
              <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: 16, sm: 18 }, lineHeight: 1.7 }}>
                Empower every learner to upskill with clear, hands‑on guidance and real‑world projects that translate into career growth.
              </Typography>
            </Paper>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Paper elevation={1} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
              <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: 16, sm: 18 }, lineHeight: 1.7 }}>
                A world where high‑quality, accessible training helps people confidently move into the roles they aspire to.
              </Typography>
            </Paper>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
              Our Core Values
            </Typography>
            <Grid container spacing={2}>
              {[
                {
                  title: 'Learner‑First',
                  body: 'We design everything with clarity, accessibility, and real outcomes in mind.',
                },
                {
                  title: 'Practical Excellence',
                  body: 'We focus on hands‑on, relevant skills you can apply immediately.',
                },
                {
                  title: 'Community & Support',
                  body: 'We foster an encouraging environment where questions and growth are welcomed.',
                },
              ].map((v) => (
                <Grid key={v.title} item xs={12} sm={4}>
                  <Paper elevation={1} sx={{ p: { xs: 2, sm: 2.5 }, height: '100%', borderRadius: 2 }}>
                    <Typography variant="h6" component="h3" fontWeight={700} gutterBottom>
                      {v.title}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: { xs: 15, sm: 16 }, lineHeight: 1.6 }}>
                      {v.body}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                component={Link}
                href="/catalog"
                variant="contained"
                color="primary"
                size="large"
                aria-label="View available courses"
              >
                View Courses
              </Button>
            </Box>
          </motion.div>
        </Stack>
      </motion.div>
    </Container>
  )
}

