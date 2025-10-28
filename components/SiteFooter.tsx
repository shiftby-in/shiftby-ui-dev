'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <Box component="footer" sx={{ mt: 'auto', py: 3, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        © {year} Shiftby. All rights reserved.
      </Typography>
    </Box>
  )
}

