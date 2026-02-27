import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
      }
    : {
        redirects: async () => {
          return [
            {
              source: "/sluzby/prodej-pronajem",
              destination: "/prodej-pronajem",
              permanent: true,
            },
            {
              source: "/sluzby/prodej-pronajem/",
              destination: "/prodej-pronajem",
              permanent: true,
            },
            {
              source: "/sluzby/vyhledavani-na-miru",
              destination: "/vyhledavani-na-miru",
              permanent: true,
            },
            {
              source: "/sluzby/vyhledavani-na-miru/",
              destination: "/vyhledavani-na-miru",
              permanent: true,
            },
          ];
        },
        rewrites: async () => {
          return {
            beforeFiles: [
              {
                source: "/api/:path*",
                destination: `${
                  process.env.BACKEND_URL || "http://127.0.0.1:4000"
                }/api/:path*`,
              },
            ],
            afterFiles: [],
            fallback: [],
          };
        },
      }),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "www.firmy.cz",
      },
    ],
  },
};

export default nextConfig;
