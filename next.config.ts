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
              source: "/kontakty",
              destination: "/kontakt",
              permanent: true,
            },
            {
              source: "/kontakty/",
              destination: "/kontakt",
              permanent: true,
            },
            {
              source: "/recenze",
              destination: "/reference",
              permanent: true,
            },
            {
              source: "/recenze/",
              destination: "/reference",
              permanent: true,
            },
            {
              source: "/sluzby",
              destination: "/co-vse-pro-vas-udelame",
              permanent: true,
            },
            {
              source: "/sluzby/",
              destination: "/co-vse-pro-vas-udelame",
              permanent: true,
            },
            {
              source: "/sluzby/pronajmy",
              destination: "/prodej-pronajem",
              permanent: true,
            },
            {
              source: "/sluzby/pronajmy/",
              destination: "/prodej-pronajem",
              permanent: true,
            },
            {
              source: "/sluzby/homestaging",
              destination: "/co-vse-pro-vas-udelame",
              permanent: true,
            },
            {
              source: "/sluzby/homestaging/",
              destination: "/co-vse-pro-vas-udelame",
              permanent: true,
            },
            {
              source: "/podporujeme",
              destination: "/co-vse-pro-vas-udelame",
              permanent: true,
            },
            {
              source: "/podporujeme/",
              destination: "/co-vse-pro-vas-udelame",
              permanent: true,
            },
            {
              source: "/vizualizace-dalsi",
              destination: "/co-vse-pro-vas-udelame",
              permanent: true,
            },
            {
              source: "/vizualizace-dalsi/",
              destination: "/co-vse-pro-vas-udelame",
              permanent: true,
            },
            {
              source: "/kariera",
              destination: "/kontakt",
              permanent: true,
            },
            {
              source: "/kariera/",
              destination: "/kontakt",
              permanent: true,
            },
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
    // Keep static export compatibility, but allow real image optimization on VPS/server mode.
    unoptimized: isStaticExport,
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
