/** @type {import('next').NextConfig} */
const nextConfig = {
  // Espace d'administration (Decap CMS) : /admin -> public/admin/index.html
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
