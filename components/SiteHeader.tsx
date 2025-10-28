'use client'

import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from 'next/link'

export default function SiteHeader() {
  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        <Typography
          variant="h6"
          component={Link as any}
          href="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 800 }}
          aria-label="Shiftby home"
        >
          Shiftby
        </Typography>
        <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 } }}>
          <Button component={Link as any} href="/courses" color="inherit">Courses</Button>
          <Button component={Link as any} href="/blogs" color="inherit">Blogs</Button>
          <Button component={Link as any} href="/about-us" color="inherit">About</Button>
          <Button component={Link as any} href="/contact" color="inherit">Contact</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

