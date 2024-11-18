/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      TMDB_API_KEY: process.env.TMDB_API_KEY,
      MONGO_URI: process.env.MONGO_URI,
      WEB3_FROM_API_KEY: process.env.WEB3_FROM_API_KEY,
      WEBSITE_NAME: process.env.WEBSITE_NAME,
      GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS
    },
    images: {
    domains: ['image.tmdb.org'], // Add TMDB image domain here
  },
  };
  
  export default nextConfig;
  