"use client";

import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

type ContactDetail = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
};

const contactDetails: ContactDetail[] = [
  {
    icon: <EmailOutlinedIcon fontSize="small" aria-hidden={true} />,
    label: "Email",
    value: "hello@shiftby.in",
    href: "mailto:hello@shiftby.in",
  },
  {
    icon: <PhoneOutlinedIcon fontSize="small" aria-hidden={true} />,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: <LocationOnOutlinedIcon fontSize="small" aria-hidden={true} />,
    label: "Office",
    value: "Shiftby Training, Hyderabad, India",
  },
];

function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const name = (data.get("name") as string) ?? "";
  const email = (data.get("email") as string) ?? "";
  const phone = (data.get("phone") as string) ?? "";
  const message = (data.get("message") as string) ?? "";

  if (typeof window === "undefined") {
    return;
  }

  const subject = encodeURIComponent(
    name ? `Contact request from ${name}` : "Contact request from Shiftby website"
  );
  const body = encodeURIComponent(
    `Name: ${name || "N/A"}\nEmail: ${email || "N/A"}\nPhone: ${phone || "N/A"}\n\nMessage:\n${message || ""}`
  );

  window.location.href = `mailto:hello@shiftby.in?subject=${subject}&body=${body}`;
}

export default function ContactPage() {
  return (
    <Container component="main" maxWidth="md" sx={{ py: { xs: 4, sm: 6 } }}>
      <Stack spacing={{ xs: 3, sm: 4 }}>
        <Box>
          <Typography
            component="h1"
            variant="h3"
            fontWeight={800}
            sx={{ fontSize: { xs: 28, sm: 36 }, mb: 1 }}
          >
            Contact Shiftby
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: { xs: 16, sm: 18 }, lineHeight: 1.6 }}
          >
            Have a question about our mentor-led programs or need support getting started? Drop us a message and we will get
            back to you soon.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 3, md: 4 },
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            alignItems: "stretch",
          }}
        >
          <Paper
            elevation={1}
            sx={{
              p: { xs: 2.5, sm: 3 },
              borderRadius: 2,
              boxShadow: { xs: "none", md: undefined },
              border: { xs: "1px solid", md: "none" },
              borderColor: { xs: "divider", md: "transparent" },
            }}
          >
            <Typography component="h2" variant="h5" fontWeight={700} gutterBottom>
              Send us a message
            </Typography>
            <Box component="form" noValidate onSubmit={handleFormSubmit}>
              <Stack spacing={2}>
                <TextField
                  id="name"
                  name="name"
                  label="Full name"
                  autoComplete="name"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  autoComplete="email"
                  required
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  id="phone"
                  name="phone"
                  type="tel"
                  label="Phone (optional)"
                  autoComplete="tel"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  id="message"
                  name="message"
                  label="How can we help?"
                  multiline
                  minRows={4}
                  variant="outlined"
                  fullWidth
                  required
                />
                <Button type="submit" variant="contained" size="large" sx={{ alignSelf: "flex-start" }}>
                  Send message
                </Button>
              </Stack>
            </Box>
          </Paper>

          <Stack spacing={2.5} sx={{ height: "100%" }}>
            <Paper
              elevation={1}
              sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: 2,
                boxShadow: { xs: "none", md: undefined },
                border: { xs: "1px solid", md: "none" },
                borderColor: { xs: "divider", md: "transparent" },
              }}
            >
              <Typography component="h2" variant="h6" fontWeight={700} gutterBottom>
                Contact information
              </Typography>
              <Stack component="dl" spacing={2} sx={{ m: 0 }}>
                {contactDetails.map(({ icon, label, value, href }) => (
                  <Box key={label} component="div" sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        mt: 0.5,
                      }}
                      aria-hidden={true}
                    >
                      {icon}
                    </Box>
                    <Box>
                      <Typography component="dt" variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
                        {label}
                      </Typography>
                      {href ? (
                        <Typography
                          component="a"
                          href={href}
                          variant="body2"
                          sx={{
                            color: "text.primary",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          {value}
                        </Typography>
                      ) : (
                        <Typography component="dd" variant="body2" sx={{ m: 0 }}>
                          {value}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>

            <Paper
              elevation={1}
              sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: 2,
                boxShadow: { xs: "none", md: undefined },
                border: { xs: "1px solid", md: "none" },
                borderColor: { xs: "divider", md: "transparent" },
              }}
            >
              <Typography component="h2" variant="h6" fontWeight={700} gutterBottom>
                Office hours
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We are available Monday to Friday, 9:00 AM to 6:00 PM IST. Leave a note anytime, and we will reply within one
                business day.
              </Typography>
            </Paper>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
