import { Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import Link from "next/link";
import type { Metadata } from "next";
import { fetchCourses } from "./api/client";

import Hero from "../src/components/HomePage/Hero";
import ValueCards from "../src/components/HomePage/ValueCards";
import TestimonialCarousel from "../src/components/HomePage/TestimonialCarousel";
import CTABanner from "../src/components/HomePage/CTABanner";

export const metadata: Metadata = {
  title: "Shiftby - Learn faster, get hired",
  description: "Mentor-led, project-based courses to accelerate your career.",
  openGraph: {
    title: "Shiftby - Learn faster, get hired",
    description: "Mentor-led, project-based courses to accelerate your career.",
    url: "https://shiftby.in",
    type: "website",
    images: [{ url: "/og-image.png" }],
  },
};

type Course = {
  id: string | number;
  title: string;
  summary?: string;
  thumbnail_url?: string;
  slug?: string;
};

async function getTopCourses(): Promise<Course[]> {
  try {
    console.log('Fetching top courses...');
    const all = await fetchCourses();
    return Array.isArray(all) ? (all as Course[]).slice(0, 3) : [];
  } catch (e: any) {
    console.error("Courses API error:", e?.message || e);
    return [];
  }
}

export default async function Home() {
  const courses = await getTopCourses();

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Hero />

      <Box sx={{ mt: 3 }}>
        <ValueCards />
      </Box>

      <Box component="section" aria-labelledby="featured-courses-title" sx={{ mt: 5 }}>
        <Typography id="featured-courses-title" variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Featured Courses
        </Typography>

        {courses.length > 0 ? (
          <Grid container spacing={2}>
            {courses.map((c) => (
              <Grid key={c.id}  size={{ xs: 12, sm: 6, md: 4 }}>
                <Link
                  href={c.slug ? `/courses/${c.slug}` : `/courses/${c.id}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <Card
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {c.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {c.summary ?? "Learn by building real projects with mentor support."}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Courses coming soon. Explore all courses.
          </Typography>
        )}

        <Box sx={{ mt: 2 }}>
          <Link href="/courses" style={{ textDecoration: "none" }}>
            <Typography color="primary" sx={{ fontWeight: 600 }}>
              Explore all courses ?
            </Typography>
          </Link>
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        <TestimonialCarousel />
      </Box>

      <CTABanner />
    </Container>
  );
}
