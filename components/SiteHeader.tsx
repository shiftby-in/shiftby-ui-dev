'use client'

import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Link from 'next/link'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'

const nav = [
  { label: 'Courses', href: '/courses' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About', href: '/about-us' },
  { label: 'Contact', href: '/contact' },
]

export default function SiteHeader() {
  const [open, setOpen] = React.useState(false)

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        backgroundColor: (t) => t.palette.background.paper,
        backdropFilter: 'saturate(180%) blur(8px)',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, gap: 1 }}>
        <Box
          component={Link as any}
          href="/"
          aria-label="Shiftby home"
          sx={{
            display: 'inline-flex',
            alignItems: 'baseline',
            textDecoration: 'none',
            color: 'inherit',
            mr: 1,
          }}
        >
          <Typography variant="h5" fontWeight={900} letterSpacing={-0.2} sx={{ lineHeight: 1 }}>
            Shiftby
          </Typography>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', ml: 0.6, mt: 1, bgcolor: 'primary.main' }} />
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Desktop nav */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          {nav.map((n) => (
            <Button key={n.href} component={Link as any} href={n.href} color="inherit">
              {n.label}
            </Button>
          ))}
          <Button
            component={Link as any}
            href="/register"
            variant="contained"
            color="primary"
            sx={{ ml: 0.5, fontWeight: 700, textTransform: 'none' }}
          >
            Register
          </Button>
        </Box>

        {/* Mobile nav */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton aria-label="Open navigation" onClick={() => setOpen(true)}>
            <MenuRoundedIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 300, pt: 1 }} role="presentation" onClick={() => setOpen(false)}>
          <List>
            {nav.map((n) => (
              <ListItemButton key={n.href} component={Link as any} href={n.href}>
                <ListItemText primary={n.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Button fullWidth component={Link as any} href="/register" variant="contained" size="large">
              Register
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  )
}
