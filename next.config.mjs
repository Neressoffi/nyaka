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
      // Ancienne étude de cas KAWA -> nouvelle fiche (cahier n°2)
      {
        source: "/realisations/kawa-coffee-shop",
        destination: "/realisations/kawa-menu-experience",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
