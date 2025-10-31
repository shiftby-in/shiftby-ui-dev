'use client'

import React, { Suspense } from 'react'
import { motion, cubicBezier } from 'framer-motion'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { fetchCourses, registerUser, Course } from '../api/client'
import { useSearchParams } from 'next/navigation'

function RegisterPageInner() {
  const search = useSearchParams()
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [mobile, setMobile] = React.useState('')
  const [courseId, setCourseId] = React.useState<string | ''>('')

  const [courses, setCourses] = React.useState<Course[]>([])
  const [loadingCourses, setLoadingCourses] = React.useState(true)
  const [submitting, setSubmitting] = React.useState(false)

  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [snackbarMsg, setSnackbarMsg] = React.useState('')
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success')

  React.useEffect(() => {
    let isMounted = true
    async function loadCourses() {
      setLoadingCourses(true)
      try {
        const payload = await fetchCourses()
        if (!isMounted) return
        setCourses(Array.isArray(payload) ? payload : [])
        // Preselect via query param when available
        const q = search?.get('course_id')
        if (q) setCourseId(q)
      } catch (e) {
        if (!isMounted) return
        setCourses([])
      } finally {
        if (!isMounted) return
        setLoadingCourses(false)
      }
    }
    loadCourses()
    return () => {
      isMounted = false
    }
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!courseId) {
      setSnackbarSeverity('error')
      setSnackbarMsg('Please select a course')
      setSnackbarOpen(true)
      return
    }
    setSubmitting(true)
    try {
      await registerUser({
        first_name: firstName,
        last_name: lastName,
        email,
        mobile,
        course_id: courseId as string,
      })
      setSnackbarSeverity('success')
      setSnackbarMsg('Registration successful!')
      setSnackbarOpen(true)
      // Reset minimal fields but keep email for convenience
      setFirstName('')
      setLastName('')
      setMobile('')
      setCourseId('')
    } catch (err: any) {
      setSnackbarSeverity('error')
      setSnackbarMsg(err?.message || 'Something went wrong')
      setSnackbarOpen(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, sm: 6 } }}>
      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: cubicBezier(0.2, 0.8, 0.2, 1) }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h3" component="h1" fontWeight={900} gutterBottom>
            Join a Shiftby Cohort
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Tell us a bit about you and pick a cohort to get started.
          </Typography>
        </Box>

        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', backdropFilter: 'blur(10px)' }}>
          <CardContent>
            <Box component="form" onSubmit={onSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    required
                    label="First name"
                name="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
            </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    required
                    label="Last name"
                name="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    required
                    type="email"
                    label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    required
                    label="Mobile"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                autoComplete="tel"
                inputProps={{ inputMode: 'tel' }}
              />
            </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="course-select-label">Course</InputLabel>
                    <Select
                      labelId="course-select-label"
                      label="Course"
                      value={courseId}
                      onChange={(e) => setCourseId(e.target.value as string)}
                      disabled={loadingCourses}
                    >
                      {loadingCourses ? (
                        <MenuItem value="" disabled>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress size={16} /> Loading courses…
                          </Box>
                        </MenuItem>
                      ) : courses.length ? (
                        courses.map((c) => (
                          <MenuItem key={String(c.id)} value={String(c.id)}>
                            {c.title}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>
                          No courses available
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting…' : 'Register'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMsg}
          </Alert>
        </Snackbar>
      </motion.div>
    </Container>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<Container maxWidth="sm" sx={{ py: { xs: 3, sm: 6 } }}><Typography variant="h6">Loading…</Typography></Container>}>
      <RegisterPageInner />
    </Suspense>
  )
}
