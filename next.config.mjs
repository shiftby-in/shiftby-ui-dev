/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-supabase-bucket-url'],
  },
};

export default nextConfig;
