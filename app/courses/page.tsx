'use client'

import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { motion, AnimatePresence, cubicBezier } from 'framer-motion'
import Link from 'next/link'
import { fetchCourses, type Course as APICourse } from '../api/client'

type Course = APICourse & { level: 'Beginner' | 'Intermediate' | 'Advanced' | string }

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, when: 'beforeChildren' },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) },
  },
}

// Motion-enhanced Grid item so AnimatePresence can control exit animations
const MotionGridItem = motion(Grid as any)

export default function CoursesPage() {
  const [courses, setCourses] = React.useState<Course[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = React.useState<'Beginner' | 'Intermediate' | 'Advanced' | null>(null)

  React.useEffect(() => {
    let isMounted = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const payload = await fetchCourses()
        console.log('Fetched courses22:', payload)
        if (!isMounted) return
        setCourses((payload || []) as Course[])
      } catch (e: any) {
        if (!isMounted) return
        setError(e?.message || 'Failed to load courses')
      } finally {
        if (!isMounted) return
        setLoading(false)
      }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [])

  const filtered = React.useMemo(() => {
    if (!selectedLevel) return courses
    return courses.filter((c) => (c.level || '').toLowerCase() === selectedLevel?.toLowerCase())
  }, [courses, selectedLevel])

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            Course Catalog
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse our published courses. Filter by level to find the right fit.
          </Typography>
        </Box>
      </Box>

      <Stack direction="row" spacing={1} sx={{ my: 2, flexWrap: 'wrap' }}>
        {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
          <Chip
            key={lvl}
            label={lvl}
            color={selectedLevel === lvl ? 'primary' : 'default'}
            variant={selectedLevel === lvl ? 'filled' : 'outlined'}
            onClick={() => setSelectedLevel((prev) => (prev === lvl ? null : lvl))}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Stack>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      )}
      {error && !loading && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          <Grid container spacing={2}>
            <AnimatePresence>
              {filtered.map((course) => (
                <MotionGridItem
                  key={course.id}
                  item
                  xs={12}
                  sm={6}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: 4 }}
                >
                  <Card sx={{ height: '100%', borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden', transition: 'transform .3s ease, box-shadow .3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
                    <CardActionArea sx={{ height: '100%' }} component={Link as any} href={`/register?course_id=${course.id}`}>
                    {course.cover_url ? (
                      <CardMedia component="img" height="160" image={course.cover_url} alt={course.title} sx={{ objectFit: 'cover' }} />
                    ) : null}
                    <CardContent>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="h6" component="h2" gutterBottom noWrap>
                            {course.title}
                          </Typography>
                          {course.summary ? (
                            <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {course.summary}
                            </Typography>
                          ) : null}
                        </Box>
                        <Stack alignItems="flex-end" spacing={1}>
                          <Chip size="small" label={course.level || '-'} />
                          {typeof course.price_usd === 'number' ? (
                            <Typography variant="subtitle1" fontWeight={700}>
                              ${course.price_usd.toFixed(2)}
                            </Typography>
                          ) : (
                            <Typography variant="subtitle2" color="text.secondary">Free</Typography>
                          )}
                        </Stack>
                      </Stack>
                    </CardContent>
                    </CardActionArea>
                  </Card>
                </MotionGridItem>
              ))}
            </AnimatePresence>
          </Grid>
        </motion.div>
      )}
    </Container>
  )
}
