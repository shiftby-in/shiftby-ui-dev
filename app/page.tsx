import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import { fetchCourses } from "./api/client";

import Hero from "../src/components/HomePage/Hero";
import ValueCards from "../src/components/HomePage/ValueCards";
import FeatureHighlights from "../src/components/HomePage/FeatureHighlights";
import CourseShowcase, { type CourseSummary } from "../src/components/HomePage/CourseShowcase";
import LearningExperience from "../src/components/HomePage/LearningExperience";
import TestimonialCarousel from "../src/components/HomePage/TestimonialCarousel";
import CTABanner from "../src/components/HomePage/CTABanner";

export const metadata: Metadata = {
  title: "Shiftby | Mentor-led tech courses to accelerate your career",
  description:
    "Shiftby offers mentor-led, project-first courses that fast-track product, data, and engineering careers with hiring support and portfolio-ready work.",
  keywords: [
    "Shiftby",
    "mentor led courses",
    "cohort based course",
    "tech upskilling",
    "product management course",
    "data analytics course",
    "frontend engineering bootcamp",
  ],
  openGraph: {
    title: "Shiftby | Mentor-led tech courses to accelerate your career",
    description:
      "Join a Shiftby cohort to build real projects, receive 1:1 mentor feedback, and unlock top-tier job opportunities across product and engineering.",
    url: "https://shiftby.in",
    type: "website",
    images: [{ url: "/og-image.png" }],
  },
};

async function getTopCourses(): Promise<CourseSummary[]> {
  try {
    const all = await fetchCourses();
    return Array.isArray(all) ? (all as CourseSummary[]).slice(0, 3) : [];
  } catch (error) {
    console.error("Courses API error:", error);
    return [];
  }
}

export default async function Home() {
  const courses = await getTopCourses();

  return (
    <Container component="main" maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, display: "flex", flexDirection: "column", gap: { xs: 6, md: 8 } }}>
      <Hero />
      <ValueCards />
      <FeatureHighlights />
      <CourseShowcase courses={courses} />
      <LearningExperience />
      <TestimonialCarousel />
      <CTABanner />

      <Box component="section" aria-labelledby="seo-description" sx={{ textAlign: "center", maxWidth: 780, mx: "auto" }}>
        <Typography id="seo-description" variant="body2" color="text.secondary">
          Shiftby’s mentor-led courses blend practical sprints, personal coaching, and a vibrant peer community to help
          working professionals master in-demand tech skills. Whether you are breaking into product management, advancing in
          frontend engineering, or leveling up data analytics, our structured cohorts keep you accountable and ready for
          the opportunities that matter.
        </Typography>
      </Box>
    </Container>
  );
}
