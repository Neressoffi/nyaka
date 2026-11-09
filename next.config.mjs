/** @type {import('next').NextConfig} */

// Hébergement Cloudflare Pages (v25) : pendant la construction sur Cloudflare
// (variable CF_PAGES=1, ou NEXT_EXPORT=1 via « npm run build:cloudflare »), le site est exporté en pages fixes dans le dossier « out ».
// Les redirections sont alors gérées par le fichier public/_redirects.
// En local (npm run dev / npm run admin), rien ne change.
const surCloudflare =
  process.env.CF_PAGES === "1" || process.env.NEXT_EXPORT === "1";

const nextConfig = surCloudflare
  ? {
      output: "export",
    }
  : {
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
          // Pages intégrées ailleurs (cahier n°4)
          { source: "/notre-approche", destination: "/a-propos#methode", permanent: true },
          { source: "/votre-situation", destination: "/solutions#votre-situation", permanent: true },
        ];
      },
    };

export default nextConfig;
