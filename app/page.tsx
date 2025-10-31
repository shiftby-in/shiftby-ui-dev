import { Container, Card, CardContent, Typography, Box } from "@mui/material";
import Link from "next/link";
import type { Metadata } from "next";
import { fetchCourses } from "./api/client";

import Hero from "../src/components/HomePage/Hero";
import QuickStats from "../src/components/HomePage/QuickStats";
import TestimonialCarousel from "../src/components/HomePage/TestimonialCarousel";
import CTABanner from "../src/components/HomePage/CTABanner";

export const metadata: Metadata = {
  title: "Learn Smarter. Build Faster. | Shiftby",
  description: "AI-powered courses for modern developers.",
  openGraph: {
    title: "Learn Smarter. Build Faster. | Shiftby",
    description: "AI-powered courses for modern developers.",
    url: "https://shiftby.in/",
    type: "website",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Smarter. Build Faster. | Shiftby",
    description: "AI-powered courses for modern developers.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
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
    const all = await fetchCourses();
    console.log("Top courses:", all);
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
        <QuickStats />
      </Box>

      <Box component="section" aria-labelledby="featured-courses-title" sx={{ mt: 5 }}>
        <Typography id="featured-courses-title" variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Featured Courses
        </Typography>

        {courses.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            {courses.map((c) => (
              <Box key={c.id}>
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
              </Box>
            ))}
          </Box>
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
