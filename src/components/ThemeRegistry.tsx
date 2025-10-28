"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";

// Create the MUI theme on the client side
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
