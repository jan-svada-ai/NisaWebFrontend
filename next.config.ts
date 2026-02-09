import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pro vývoj: proxy na backend
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `${
            process.env.BACKEND_URL || "https://nisawebapi.onrender.com"
          }/api/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  images: {
    unoptimized: true, // Nutné pro static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default nextConfig;
